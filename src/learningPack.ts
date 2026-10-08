import type { Expression } from "./createLocalLesson"

export type LearningPack = {
  format: "listening-room-pack-v1"
  title: string
  transcript: string
  sourceUrl?: string
  expressions: Expression[]
}

function object(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
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
