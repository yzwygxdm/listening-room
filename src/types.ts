export type Lesson = {
  id: string
  local?: boolean
  transcript?: string
  day: number
  date: string
  title: string
  tag: string
  source: string
  sourceCode: string
  sourceUrl: string
  kind: "podcast" | "video"
  durationMinutes: number
  vocabularyLabel: string
  overview?: {
    summary: string
    takeaways: string[]
    note: string
    transcriptUrl: string
    audioUrl: string
  }
  cards: { w: string; m: string; e: string }[]
  financeCards: string[][]
  quizzes: { q: string; opts: string[]; a: number; en: string; zh: string; key: string }[]
  financeQs: { before: string; after: string; ans: string; opts: string[]; hint: string; zh: string }[]
  prompts: { topic: string; cn: string; words: string[]; tip: string; follow: string; ex: string; zh: string }[]
}
