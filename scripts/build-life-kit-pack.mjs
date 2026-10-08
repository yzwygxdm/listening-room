import { createServer } from "vite"
import { writeFile } from "node:fs/promises"

const names = ["2026-10-01-money", "2026-10-05-journaling", "2026-10-06-health-insurance"]
const readings = [
  `A money goal is easier to revisit when it becomes a small, repeatable task. Imagine that you are in the final months of a year and want to get a sense of where you're at. Start with a simple record of money coming in and money going out. You might notice that small expenses pile up, or that a bill arrives out of the blue. Neither observation is a judgment about you; it is useful information.

Next, choose one goal to chip away at. It could be building an emergency fund, reducing a balance, or setting money aside for a planned expense. Account for bills that are easy to forget, and ask how much money you have left over after essentials. A modest plan that fits your cash flow may be easier to follow than an ambitious plan you cannot maintain.

This is an original English practice passage inspired by the theme of reviewing financial goals. It is not a transcript, quotation, or summary of the exact words spoken in the NPR episode. Open the original episode page to listen and compare the topic with your own plan.`,
  `A private notebook can give you a place to make sense of a difficult week. You do not have to produce a polished story for an audience. The first step may be to put pen to paper and describe one moment that is still on your mind. If a full paragraph feels hard, start small: write a list, a question, or two imperfect sentences.

Writing can help you work through a feeling without requiring you to solve it immediately. Give yourself permission to change your mind as you write. You can describe what happened, what you felt, and what you still do not understand. A short routine after breakfast or before bed may help you get into the habit of returning to the page.

This is an original English practice passage inspired by the theme of journaling. It is not an NPR transcript or a quotation from the episode. The learning expressions and exercises are original practice material; visit the source page for the original audio.`,
  `Choosing a health insurance plan can involve unfamiliar vocabulary. In this practice scenario, a learner compares two imaginary plans. One has a lower monthly premium, but a higher deductible. The other costs more each month and may have different rules for doctors and clinics. The learner decides to look beyond the headline price and factor in how often they might need care.

Before making a choice, the learner reads the fine print. They write down questions about copayments, coinsurance, the provider network, and the out-of-pocket maximum. The costs can add up in different ways, so they compare several possible situations rather than one number. They also check whether their preferred clinic is in network. These questions help them make an informed decision about an imaginary example, not a real policy.

This is an original English practice passage inspired by the theme of comparing insurance plans. It is not an NPR transcript or current insurance advice. Terms and plan rules vary; consult the original episode page and current plan documents for real decisions.`,
]
const ids = [
  "local-4f7c6165-6b69-4001-8000-000000000001",
  "local-4f7c6165-6b69-4001-8000-000000000002",
  "local-4f7c6165-6b69-4001-8000-000000000003",
]

const server = await createServer({ server: { middlewareMode: true, watch: null, hmr: false }, appType: "custom" })
try {
  const lessons = []
  for (let index = 0; index < names.length; index++) {
    const { default: source } = await server.ssrLoadModule(`/src/lessons/${names[index]}.ts`)
    lessons.push({
      id: ids[index], day: index + 1, date: source.date, title: source.title,
      tag: source.tag, source: "Life Kit · 原创学习包", sourceUrl: source.sourceUrl,
      readingKind: "study-guide",
      readingNote: "本页是原创英文学习导读，不是 NPR 节目逐字稿；表达、例句和题目为学习练习，不保证在原节目中逐字出现。",
      transcript: readings[index],
      cards: source.cards, financeCards: source.financeCards, quizzes: source.quizzes,
      financeQs: source.financeQs, prompts: source.prompts,
    })
  }
  const bundle = {
    format: "listening-room-bundle-v1",
    title: "Life Kit 首期英语学习包 · 理财、日记与医保",
    description: "三期独立章节。包含原创英文学习导读、表达、主题词汇、测验和造句；不含 NPR 音频或逐字稿。",
    lessons,
  }
  await writeFile(new URL("../public/life-kit-pack-01.json", import.meta.url), `${JSON.stringify(bundle, null, 2)}\n`)
  console.log(`Built ${lessons.length} chapters, ${lessons.reduce((n, item) => n + item.cards.length, 0)} expressions, ${lessons.reduce((n, item) => n + item.financeCards.length, 0)} vocabulary items.`)
} finally { await server.close() }
