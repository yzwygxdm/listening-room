import type { Expression } from "./createLocalLesson"
import type { Lesson } from "./types"

export type LearningPack = {
  format: "listening-room-pack-v1"
  title: string
  transcript: string
  sourceUrl?: string
  expressions: Expression[]
}

export type LearningBundle = {
  format: "listening-room-bundle-v1"
  title: string
  lessons: Lesson[]
}

function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

function string(value: unknown, label: string, max = 3000): string {
  if (typeof value !== "string" || !value.trim() || value.length > max)
    throw new Error(`${label}缺失或过长。`)
  return value
}

function httpUrl(value: unknown, label: string): string {
  const url = string(value, label, 2000)
  let parsed: URL
  try { parsed = new URL(url) } catch { throw new Error(`${label}不是有效链接。`) }
  if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password)
    throw new Error(`${label}需要普通 HTTP/HTTPS 链接。`)
  return url
}

function list<T>(value: unknown, label: string, max: number, parse: (item: unknown, index: number) => T): T[] {
  if (!Array.isArray(value) || !value.length || value.length > max)
    throw new Error(`${label}数量不正确。`)
  return value.map(parse)
}

function strings(value: unknown, label: string, count?: number): string[] {
  if (!Array.isArray(value) || (count !== undefined && value.length !== count) || value.length > 10)
    throw new Error(`${label}格式不正确。`)
  return value.map((item) => string(item, label, 1000))
}

export function validateBundleLesson(value: unknown): Lesson {
  if (!object(value)) throw new Error("合集中的章节格式不正确。")
  const id = string(value.id, "章节 ID", 50)
  if (!/^local-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id))
    throw new Error("合集章节 ID 格式不正确。")
  const cards = list(value.cards, "表达", 100, (item) => {
    if (!object(item)) throw new Error("表达格式不正确。")
    return { w: string(item.w, "英文表达", 150), m: string(item.m, "中文含义", 300),
      e: string(item.e, "英文例句", 1000) }
  })
  if (new Set(cards.map(({ w }) => w.toLowerCase())).size !== cards.length)
    throw new Error("章节中的表达不能重复。")
  const financeCards = list(value.financeCards, "主题词汇", 100, (item) => strings(item, "主题词汇", 3))
  const quizzes = list(value.quizzes, "表达测验", 100, (item) => {
    if (!object(item)) throw new Error("表达测验格式不正确。")
    const opts = strings(item.opts, "表达测验选项", 4)
    const a = item.a
    if (!Number.isInteger(a) || Number(a) < 0 || Number(a) > 3) throw new Error("表达测验答案不正确。")
    return { q: string(item.q, "表达测验题目", 500), opts, a: Number(a),
      en: string(item.en, "英文例句", 1000), zh: string(item.zh, "中文例句", 1000),
      key: string(item.key, "正确表达", 150) }
  })
  const financeQs = list(value.financeQs, "词汇填空", 100, (item) => {
    if (!object(item)) throw new Error("词汇填空格式不正确。")
    if (typeof item.before !== "string" || typeof item.after !== "string")
      throw new Error("词汇填空句子不正确。")
    return { before: item.before.slice(0, 1000), after: item.after.slice(0, 1000),
      ans: string(item.ans, "词汇填空答案", 150), opts: strings(item.opts, "词汇填空选项", 4),
      hint: string(item.hint, "词汇提示", 300), zh: string(item.zh, "词汇例句译文", 1000) }
  })
  const prompts = list(value.prompts, "写作话题", 20, (item) => {
    if (!object(item)) throw new Error("写作话题格式不正确。")
    return { topic: string(item.topic, "写作话题", 300), cn: string(item.cn, "写作提示", 1000),
      words: strings(item.words, "写作目标表达"), tip: string(item.tip, "写作提示", 1000),
      follow: string(item.follow, "追问", 1000), ex: string(item.ex, "写作例句", 1000),
      zh: string(item.zh, "写作例句译文", 1000) }
  })
  if (quizzes.length !== cards.length || financeQs.length !== financeCards.length ||
      quizzes.some((q) => new Set(q.opts).size !== 4) ||
      financeQs.some((q) => !q.opts.includes(q.ans)))
    throw new Error("合集练习与表达、词汇不匹配。")
  const day = value.day
  if (!Number.isInteger(day) || Number(day) < 1 || Number(day) > 999)
    throw new Error("章节序号不正确。")
  const date = string(value.date, "章节日期", 10)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("章节日期格式不正确。")
  const reading = string(value.transcript, "原创学习导读", 300_000)
  if (value.readingKind !== "study-guide") throw new Error("合集阅读材料必须标为原创学习导读。")
  return { id, local: true, readingKind: "study-guide", readingNote:
      string(value.readingNote, "导读说明", 500), transcript: reading,
    day: Number(day), date, title: string(value.title, "章节标题", 300),
    tag: string(value.tag, "章节主题", 150), source: string(value.source, "节目来源", 150),
    sourceCode: "MY", sourceUrl: httpUrl(value.sourceUrl, "节目链接"), kind: "podcast",
    durationMinutes: 0, vocabularyLabel: "主题词汇", cards, financeCards, quizzes, financeQs, prompts }
}

export function parseLearningFile(raw: string): LearningPack | LearningBundle {
  let value: unknown
  try { value = JSON.parse(raw) } catch { throw new Error("学习包不是有效的 JSON 文件。") }
  if (object(value) && value.format === "listening-room-bundle-v1") {
    const lessons = list(value.lessons, "合集章节", 20, validateBundleLesson)
    if (new Set(lessons.map(({ id }) => id)).size !== lessons.length)
      throw new Error("合集章节 ID 不能重复。")
    return { format: "listening-room-bundle-v1", title: string(value.title, "合集标题", 300), lessons }
  }
  return parseLearningPack(raw)
}

export function parseLearningPack(raw: string): LearningPack {
  let value: unknown
  try { value = JSON.parse(raw) } catch { throw new Error("学习包不是有效的 JSON 文件。") }
  if (!object(value) || value.format !== "listening-room-pack-v1")
    throw new Error("文件不是受支持的学习包（需要 listening-room-pack-v1）。")
  if (typeof value.title !== "string" || typeof value.transcript !== "string" || !Array.isArray(value.expressions))
    throw new Error("学习包缺少标题、英文逐字稿或表达列表。")
  if (value.sourceUrl !== undefined && typeof value.sourceUrl !== "string")
    throw new Error("学习包的来源链接格式不正确。")
  if (value.expressions.length > 100) throw new Error("单期最多导入 100 条表达。")
  const expressions = value.expressions.map((item, index) => {
    if (!object(item) || typeof item.word !== "string" || typeof item.meaning !== "string" ||
        typeof item.example !== "string" ||
        (item.exampleZh !== undefined && typeof item.exampleZh !== "string"))
      throw new Error(`学习包第 ${index + 1} 条表达格式不正确。`)
    return { word: item.word.trim(), meaning: item.meaning.trim(),
      example: item.example.trim(), exampleZh: (item.exampleZh ?? "").trim() } as Expression
  })
  return {
    format: "listening-room-pack-v1",
    title: value.title.trim(),
    transcript: value.transcript,
    sourceUrl: value.sourceUrl?.trim(),
    expressions,
  }
}
