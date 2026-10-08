import type { Lesson } from "./types"

export type Expression = { word: string; meaning: string; example: string; exampleZh: string }

export function cleanTranscript(raw: string): string {
  return raw.replace(/^WEBVTT[^\n]*\n/m, "")
    .replace(/^\s*\d+\s*$/gm, "")
    .replace(/^\s*(?:\d\d:)?\d\d:\d\d[.,]\d{3}\s*-->.*$/gm, "")
    .replace(/\n{3,}/g, "\n\n").trim()
}

export function validateExpressions(parsed: Expression[]): Expression[] {
  if (!parsed.length) throw new Error("请至少填写一条表达。")
  if (parsed.length > 100) throw new Error("单期最多导入 100 条表达。")
  parsed.forEach(({ word, meaning, example }, index) => {
    if (typeof word !== "string" || typeof meaning !== "string" || typeof example !== "string" ||
        !word.trim() || !meaning.trim() || !example.trim())
      throw new Error(`第 ${index + 1} 行缺少表达、中文含义或英文例句。`)
    if (!example.toLocaleLowerCase().includes(word.toLocaleLowerCase()))
      throw new Error(`第 ${index + 1} 行的英文例句需要包含该表达，以便生成填空练习。`)
  })
  if (new Set(parsed.map(({ word }) => word.toLocaleLowerCase())).size !== parsed.length)
    throw new Error("表达不能重复。")
  return parsed
}

export function parseExpressions(raw: string): Expression[] {
  const rows = raw.split(/\r?\n/).map((row) => row.trim()).filter(Boolean)
  return validateExpressions(rows.map((row) => {
    const [word = "", meaning = "", example = "", exampleZh = ""] = row.split("|").map((part) => part.trim())
    return { word, meaning, example, exampleZh }
  }))
}

export function validateAudioFile(file: File): void {
  if (!file.type.startsWith("audio/") && !/\.(mp3|m4a|wav|ogg)$/i.test(file.name))
    throw new Error("请选择音频文件（MP3、M4A、WAV 或 OGG）。")
  if (file.size > 250 * 1024 * 1024) throw new Error("音频文件不能超过 250 MB。")
}

const fallbackOptions = ["look into", "put off", "bring up", "carry out", "come across", "figure out"]

function choices(expressions: Expression[], correct: string, index: number): string[] {
  const others = [...expressions.map(({ word }) => word), ...fallbackOptions]
    .filter((item) => item.toLocaleLowerCase() !== correct.toLocaleLowerCase())
  const unique = [...new Set(others)].slice(index, index + 3)
  for (const option of others) if (unique.length < 3 && !unique.includes(option)) unique.push(option)
  const answerIndex = index % 4
  unique.splice(answerIndex, 0, correct)
  return unique
}

export function createLocalLesson(input: {
  title: string
  transcript: string
  expressions: string | Expression[]
  audio?: File | null
  sourceUrl?: string
}): Lesson {
  const title = input.title.trim()
  const transcript = cleanTranscript(input.transcript)
  const expressions = typeof input.expressions === "string"
    ? parseExpressions(input.expressions) : validateExpressions(input.expressions)
  if (!title) throw new Error("请填写节目标题。")
  if (!transcript) throw new Error("请导入或粘贴英文逐字稿。")
  if (transcript.length > 300_000) throw new Error("逐字稿过长，请分成多期导入。")
  if (input.audio) validateAudioFile(input.audio)
  const sourceUrl = input.sourceUrl?.trim() ?? ""
  if (sourceUrl) {
    const parsed = new URL(sourceUrl)
    if (!["https:", "http:"].includes(parsed.protocol) || parsed.username || parsed.password)
      throw new Error("来源链接需要是普通的 HTTP/HTTPS 地址。")
  }
  return {
    id: `local-${crypto.randomUUID()}`,
    local: true,
    transcript,
    day: 0,
    date: new Date().toLocaleDateString("en-CA"),
    title,
    tag: "我的播客",
    source: "本地导入",
    sourceCode: "MY",
    sourceUrl,
    kind: "podcast",
    durationMinutes: 0,
    vocabularyLabel: "表达",
    cards: expressions.map(({ word, meaning, example }) => ({ w: word, m: meaning, e: example })),
    financeCards: expressions.map(({ word, meaning, example }) => [word, meaning, example]),
    quizzes: expressions.map(({ word, meaning, example, exampleZh }, index) => {
      const opts = choices(expressions, word, index)
      const start = example.toLocaleLowerCase().indexOf(word.toLocaleLowerCase())
      return {
        q: `表达“${meaning}”最合适的是？`, opts, a: opts.indexOf(word),
        en: `${example.slice(0, start)}**${example.slice(start, start + word.length)}**${example.slice(start + word.length)}`,
        zh: exampleZh || "请结合英文例句理解这一表达。", key: word,
      }
    }),
    financeQs: expressions.map(({ word, meaning, example, exampleZh }, index) => {
      const start = example.toLocaleLowerCase().indexOf(word.toLocaleLowerCase())
      return {
        before: example.slice(0, start), after: example.slice(start + word.length), ans: word,
        opts: choices(expressions, word, index + 1), hint: meaning,
        zh: exampleZh || "参考英文原句，观察该表达的使用语境。",
      }
    }),
    prompts: expressions.map(({ word, meaning }) => ({
      topic: `Use “${word}” in your own sentence`,
      cn: `用“${word}”（${meaning}）写一件与你有关的事。`,
      words: [word], tip: "从真实场景开始，再补充一个细节。",
      follow: "When did it happen? Why does it matter to you?",
      ex: `Write one original sentence with “${word}”.`,
      zh: "示例留空，先尝试自己表达。",
    })),
  }
}
