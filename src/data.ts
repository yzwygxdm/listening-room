import type { Lesson } from "./types"

// Each new lesson is a separate file; Vite discovers it automatically.
const modules = import.meta.glob<Lesson>("./lessons/*.ts", {
  eager: true,
  import: "default",
})

export const lessons = Object.values(modules).sort((a, b) => a.day - b.day)

if (!lessons.length) throw new Error("请先添加至少一期学习内容。")
if (new Set(lessons.map((lesson) => lesson.id)).size !== lessons.length)
  throw new Error("学习内容的 id 不能重复。")

export const initialLessonId = "2026-10-01-money"
