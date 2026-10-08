import { createLocalLesson, type Expression } from "./createLocalLesson"
import { saveLocalLesson, type LocalLesson } from "./localLessons"

type BackupLesson = {
  id: string
  date: string
  title: string
  transcript: string
  sourceUrl: string
  expressions: Expression[]
  createdAt?: number
  marks: { start: number; end: number }[]
  progress: string[]
  drafts: { index: number; sentence: string; expanded: string }[]
}
type Backup = {
  format: "listening-room-backup-v1"
  lessons: BackupLesson[]
  archive: Record<string, string>[]
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function stored(key: string): unknown {
  try { return JSON.parse(localStorage.getItem(key) ?? "null") } catch { return null }
}

function saveMissing(key: string, value: unknown): void {
  if (localStorage.getItem(key) === null) localStorage.setItem(key, JSON.stringify(value))
}

function validArchive(value: unknown): value is Record<string, string>[] {
  return Array.isArray(value) && value.every((item) => isObject(item) &&
    ["date", "topic", "original", "expanded"].every((key) => typeof item[key] === "string") &&
    ["lessonId", "lessonTitle", "rewrite", "note", "naturalness", "rewriteZh"]
      .every((key) => item[key] === undefined || typeof item[key] === "string"))
}

export function createLibraryBackup(records: LocalLesson[]): Blob {
  const lessons: BackupLesson[] = records.map(({ lesson, createdAt }) => {
    const drafts = lesson.prompts.map((_, index) => {
      const item = stored(`listening-room-draft:${lesson.id}:${index}`)
      return isObject(item) && typeof item.sentence === "string" && typeof item.expanded === "string"
        ? { index, sentence: item.sentence, expanded: item.expanded } : null
    }).filter((draft): draft is NonNullable<typeof draft> => draft !== null)
    const marks = stored(`listening-room-marks:${lesson.id}`)
    const progress = stored(`listening-room-progress:${lesson.id}`)
    return {
      id: lesson.id, date: lesson.date, title: lesson.title, transcript: lesson.transcript ?? "",
      sourceUrl: lesson.sourceUrl, createdAt,
      expressions: lesson.cards.map((card) => ({
        word: card.w, meaning: card.m, example: card.e,
        exampleZh: lesson.quizzes.find((item) => item.key === card.w)?.zh ?? "",
      })),
      marks: Array.isArray(marks) ? marks : [],
      progress: Array.isArray(progress) ? progress : [],
      drafts,
    }
  })
  const archive = stored("podcast-sentence-archive")
  const backup: Backup = { format: "listening-room-backup-v1", lessons,
    archive: validArchive(archive) ? archive : [] }
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" })
  if (blob.size > 50 * 1024 * 1024) throw new Error("文字备份超过 50 MB，请减少资料库内容后重试。")
  return blob
}

export async function restoreLibraryBackup(file: File, existing: LocalLesson[]): Promise<LocalLesson[]> {
  if (file.size > 50 * 1024 * 1024) throw new Error("备份文件不能超过 50 MB。")
  let value: unknown
  try { value = JSON.parse(await file.text()) } catch { throw new Error("备份不是有效的 JSON 文件。") }
  if (!isObject(value) || value.format !== "listening-room-backup-v1" ||
      !Array.isArray(value.lessons) || !validArchive(value.archive) || value.lessons.length > 500)
    throw new Error("文件不是受支持的资料库备份。")
  const restored: LocalLesson[] = []
  const known = new Set(existing.map(({ lesson }) => lesson.id))
  const validated: { record: LocalLesson; progress: string[]; marks: { start: number; end: number }[];
    drafts: { index: number; sentence: string; expanded: string }[] }[] = []
  for (const raw of value.lessons) {
    if (!isObject(raw) || typeof raw.id !== "string" || !/^local-[0-9a-f-]{36}$/i.test(raw.id) ||
        typeof raw.date !== "string" || typeof raw.title !== "string" || typeof raw.transcript !== "string" ||
        typeof raw.sourceUrl !== "string" || !Array.isArray(raw.expressions) ||
        !Array.isArray(raw.marks) || raw.marks.length > 10_000 ||
        !Array.isArray(raw.progress) || raw.progress.length > 1_000 ||
        !Array.isArray(raw.drafts) || raw.drafts.length > 100)
      throw new Error("备份中的学习内容格式不正确。")
    const expressions = raw.expressions.map((item) => {
      if (!isObject(item) || typeof item.word !== "string" || typeof item.meaning !== "string" ||
          typeof item.example !== "string" || typeof item.exampleZh !== "string")
        throw new Error("备份中的表达格式不正确。")
      return item as Expression
    })
    const lesson = createLocalLesson({ title: raw.title, transcript: raw.transcript,
      sourceUrl: raw.sourceUrl, expressions })
    lesson.id = raw.id
    lesson.date = raw.date
    const transcriptLength = raw.transcript.length
    const progress = raw.progress.every((item) => typeof item === "string") ? raw.progress : []
    const marks = raw.marks.filter((item): item is { start: number; end: number } =>
      isObject(item) && Number.isInteger(item.start) && Number.isInteger(item.end) &&
      Number(item.start) >= 0 && Number(item.end) <= transcriptLength && Number(item.start) < Number(item.end))
    const drafts = raw.drafts.filter((item): item is { index: number; sentence: string; expanded: string } =>
      isObject(item) && Number.isInteger(item.index) && Number(item.index) >= 0 &&
      Number(item.index) < lesson.prompts.length &&
      typeof item.sentence === "string" && typeof item.expanded === "string")
    validated.push({ record: { lesson, createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now() },
      progress, marks, drafts })
  }
  for (const { record, progress, marks, drafts } of validated) {
    const { lesson } = record
    if (!known.has(lesson.id)) {
      await saveLocalLesson(record)
      restored.push(record)
      known.add(lesson.id)
    }
    saveMissing(`listening-room-progress:${lesson.id}`, progress)
    saveMissing(`listening-room-marks:${lesson.id}`, marks)
    for (const draft of drafts)
      saveMissing(`listening-room-draft:${lesson.id}:${draft.index}`, {
        sentence: draft.sentence, expanded: draft.expanded,
      })
  }
  const archive = stored("podcast-sentence-archive")
  const current = validArchive(archive) ? archive : []
  const seen = new Set(current.map((entry) => JSON.stringify([entry.date, entry.topic, entry.original, entry.expanded])))
  const merged = [...current]
  for (const entry of value.archive) {
    const key = JSON.stringify([entry.date, entry.topic, entry.original, entry.expanded])
    if (!seen.has(key)) { merged.push(entry); seen.add(key) }
  }
  localStorage.setItem("podcast-sentence-archive", JSON.stringify(merged))
  return restored
}
