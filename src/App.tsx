import { useEffect, useRef, useState } from "react"
import { lessons } from "./data"
import type { Lesson } from "./types"

type IconName = "headphones" | "arrow" | "chevron" | "shuffle" | "volume" | "cards" | "check" | "chart" | "pen" | "book" | "sun" | "clock" | "spark" | "leaf" | "download" | "settings" | "close"
function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: IconName
  size?: number
  className?: string
}) {
  const paths: Record<IconName, React.ReactNode> = {
    headphones: (
      <>
        <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
        <rect x="3" y="12" width="4" height="8" rx="2" />
        <rect x="17" y="12" width="4" height="8" rx="2" />
      </>
    ),
    arrow: (
      <>
        <path d="M4 12h15m-6-6 6 6-6 6" />
      </>
    ),
    chevron: <path d="m9 5 7 7-7 7" />,
    shuffle: (
      <>
        <path d="M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c2 0 4-2 5-5m3-5c1-1 2-2 4-2h3m-4-4 4 4-4 4" />
      </>
    ),
    volume: (
      <>
        <path d="m11 4-6 5H2v6h3l6 5zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
      </>
    ),
    cards: (
      <>
        <rect x="6" y="4" width="14" height="17" rx="3" />
        <path d="M3 17V5a3 3 0 0 1 3-3m4 8h6m-6 4h4" />
      </>
    ),
    check: (
      <>
        <path d="m7 12 3 3 7-7" />
        <rect x="3" y="3" width="18" height="18" rx="5" />
      </>
    ),
    chart: (
      <>
        <path d="M4 3v17h17M8 15v-4m5 4V7m5 8V4" />
      </>
    ),
    pen: (
      <>
        <path d="m14 5 5 5M4 20l5-1L20 8a3.5 3.5 0 0 0-5-5L4 14z" />
      </>
    ),
    book: (
      <>
        <path d="M12 5v15M12 5C8 2 4 3 2 4v15c3-1 6-1 10 1 4-2 7-2 10-1V4c-3-1-6-2-10 1Z" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 3C9 2 3 7 5 15c7 5 15-1 15-12ZM4 21 15 10" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="m9 3-1 3-3 1-2 3 2 2-1 3 3 2 2-1 3 3 3-1 1-3 3-1 2-3-2-2 1-3-3-2-2 1-3-3z" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function PodcastArt() {
  return (
    <svg
      className="podcast-art"
      viewBox="0 0 210 210"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="105" cy="108" r="74" fill="#cce9d6" />
      <circle cx="105" cy="108" r="59" fill="#f2ae81" />
      <path
        d="M67 113V95a38 38 0 0 1 76 0v18"
        stroke="#254e42"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        d="M67 113V95a38 38 0 0 1 76 0v18"
        stroke="#366d58"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect
        x="56"
        y="102"
        width="23"
        height="42"
        rx="10"
        fill="#254e42"
        transform="rotate(-9 56 102)"
      />
      <rect
        x="132"
        y="101"
        width="23"
        height="42"
        rx="10"
        fill="#254e42"
        transform="rotate(9 132 101)"
      />
      <path
        d="M142 143c-2 16-15 21-31 21"
        stroke="#254e42"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect x="101" y="159" width="16" height="8" rx="4" fill="#254e42" />
      <path
        d="M93 110v12m8-20v29m8-34v38m8-29v21"
        stroke="#fff9ec"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path d="m167 40 3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="#346a55" />
      <path d="m39 145 2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#346a55" />
      <circle cx="42" cy="56" r="4" fill="#edac7f" />
      <circle cx="172" cy="155" r="4" fill="#edac7f" />
      <path
        d="m32 91 9-3m127 31 10 3"
        stroke="#72a38b"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

type Panel = "warmup" | "quiz" | "finance" | "speak"
type Entry = {
  lessonId?: string
  lessonTitle?: string
  date: string
  topic: string
  original: string
  expanded: string
  rewrite?: string
  note?: string
  naturalness?: string
  rewriteZh?: string
}
type Feedback = {
  grammar?: string
  naturalness?: string
  rewrite?: string
  rewriteZh?: string
}
const steps: {
  id: Panel
  name: string
  en: string
  icon: IconName
  time: string
}[] = [
  {
    id: "warmup",
    name: "快速热身",
    en: "Recall & remember",
    icon: "cards",
    time: "2 分钟",
  },
  {
    id: "quiz",
    name: "表达小测",
    en: "A little quick check",
    icon: "check",
    time: "3 分钟",
  },
  {
    id: "finance",
    name: "词汇填空",
    en: "Words that matter",
    icon: "chart",
    time: "3 分钟",
  },
  {
    id: "speak",
    name: "话题造句",
    en: "Make it yours",
    icon: "pen",
    time: "4 分钟",
  },
]
function load<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback
  } catch {
    return fallback
  }
}
function store(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export default function App() {
  const [selectedId, setSelectedId] = useState(() => {
    const saved = load<string>("listening-room-selected-lesson", "")
    return lessons.some((lesson) => lesson.id === saved)
      ? saved
      : lessons[lessons.length - 1].id
  })
  const lesson = lessons.find((item) => item.id === selectedId) ?? lessons[lessons.length - 1]
  return (
    <LessonRoom
      key={lesson.id}
      lesson={lesson}
      onLessonChange={(id) => {
        store("listening-room-selected-lesson", id)
        setSelectedId(id)
      }}
    />
  )
}

function LessonRoom({ lesson, onLessonChange }: {
  lesson: Lesson
  onLessonChange: (id: string) => void
}) {
  const { cards, financeCards, quizzes, financeQs, prompts } = lesson
  const dayLabel = String(lesson.day).padStart(2, "0")
  const lessonSteps = steps.map((step) => step.id === "finance"
    ? { ...step, name: "词汇填空", en: "Words in context" }
    : step)
  const progressKey = `listening-room-progress:${lesson.id}`
  const initialDraft = load<{ sentence: string; expanded: string }>(
    `listening-room-draft:${lesson.id}:0`, { sentence: "", expanded: "" },
  )
  const [panel, setPanel] = useState<Panel>("warmup")
  const [reviewed, setReviewed] = useState<string[]>(() =>
    load(progressKey, []),
  )
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [financeIndex, setFinanceIndex] = useState(0)
  const [answer, setAnswer] = useState<number | null>(null)
  const [financeAnswer, setFinanceAnswer] = useState<number | null>(null)
  const [promptIndex, setPromptIndex] = useState(0)
  const [sentence, setSentence] = useState(initialDraft.sentence)
  const [expanded, setExpanded] = useState(initialDraft.expanded)
  const [archive, setArchive] = useState<Entry[]>(() =>
    load("podcast-sentence-archive", []),
  )
  const [toast, setToast] = useState("")
  const [aiStatus, setAiStatus] = useState("")
  const [aiFeedback, setAiFeedback] = useState<Feedback | null>(null)
  const [checking, setChecking] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [endpoint, setEndpoint] = useState(() => {
    try {
      const saved = localStorage.getItem("podcast-ai-endpoint")?.trim() || ""
      return saved === "/api/review" ? "" : saved
    } catch {
      return ""
    }
  })
  const [endpointDraft, setEndpointDraft] = useState(endpoint)
  const [library, setLibrary] = useState(false)
  const [libraryTab, setLibraryTab] = useState("expressions")
  const archiveRef = useRef<HTMLDivElement>(null)
  const libraryRef = useRef<HTMLDivElement>(null)
  const importRef = useRef<HTMLInputElement>(null)
  const card = cards[cardIndex]
  const quiz = quizzes[quizIndex]
  const finance = financeQs[financeIndex]
  const topic = prompts[promptIndex]
  const current = lessonSteps.find((step) => step.id === panel)!
  const done = lessonSteps.filter(({ id }) => {
    if (id === "speak") return reviewed.includes("speak")
    const total = id === "warmup" ? cards.length : id === "quiz" ? quizzes.length : financeQs.length
    return Array.from({ length: total }, (_, i) => `${id}:${i}`).every((key) => reviewed.includes(key))
  }).map(({ id }) => id)
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3200)
      return () => clearTimeout(timer)
    }
  }, [toast])
  function mark(id: Panel, index?: number) {
    const key = id === "speak" ? id : `${id}:${index}`
    setReviewed((previous) => {
      const next = previous.includes(key) ? previous : [...previous, key]
      store(progressKey, next)
      return next
    })
  }
  function saveDraft(nextSentence: string, nextExpanded: string) {
    store(`listening-room-draft:${lesson.id}:${promptIndex}`, {
      sentence: nextSentence, expanded: nextExpanded,
    })
  }
  function openAISettings() {
    setEndpointDraft(endpoint)
    setSettingsOpen(true)
  }
  function changeCard(index: number) {
    setCardIndex((index + cards.length) % cards.length)
    setFlipped(false)
  }
  function switchPanel(id: Panel) {
    setPanel(id)
  }
  function showArchive() {
    setPanel("speak")
    setTimeout(
      () =>
        archiveRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      50,
    )
  }
  function openLibrary() {
    setLibrary(true)
    setTimeout(
      () =>
        libraryRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      50,
    )
  }
  function pronounce() {
    if (!("speechSynthesis" in window)) {
      setToast("此浏览器暂不支持朗读。")
      return
    }
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(card.w)
    utterance.lang = "en-US"
    utterance.rate = 0.85
    speechSynthesis.speak(utterance)
  }
  function saveSentence(feedback?: Feedback) {
    if (!sentence.trim()) {
      setToast("先写下一个句子，再保存吧。")
      return
    }
    const next = [
      ...archive,
      {
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        date: new Date().toLocaleDateString("zh-CN", { timeZone: "Asia/Shanghai" }),
        topic: topic.topic,
        original: sentence.trim(),
        expanded: expanded.trim(),
        rewrite: feedback?.rewrite,
        note: feedback?.grammar,
        naturalness: feedback?.naturalness,
        rewriteZh: feedback?.rewriteZh,
      },
    ]
    setArchive(next)
    const saved = store("podcast-sentence-archive", next)
    mark("speak")
    setToast(
      saved
        ? "你的句子已保存，今天又进步了一点。"
        : "句子已暂存；浏览器存储不可用，请导出备份。",
    )
  }
  async function checkWriting() {
    if (!sentence.trim()) {
      setToast("先写出你的核心句，再开始检查。")
      return
    }
    if (!endpoint) {
      setAiStatus(
        "AI 批改尚未连接。请在「设置 AI」中添加你自己的服务端点；也可以先保存原句。",
      )
      return
    }
    setChecking(true)
    setAiStatus("正在检查语法、地道性与表达…")
    setAiFeedback(null)
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.topic,
          expressions: topic.words,
          original: sentence,
          expanded,
          followup: topic.follow,
        }),
        signal: AbortSignal.timeout(40000),
      })
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(typeof error.error === "string" ? error.error : "暂时无法完成批改，请稍后重试。")
      }
      const raw = await response.json()
      if (!raw || typeof raw !== "object") throw new Error("Invalid feedback")
      const feedback: Feedback = {}
      for (const key of [
        "grammar",
        "naturalness",
        "rewrite",
        "rewriteZh",
      ] as const)
        if (typeof raw[key] === "string") feedback[key] = raw[key]
      if (!Object.values(feedback).some((value) => value?.trim()))
        throw new Error("Empty feedback")
      setAiFeedback(feedback)
      setAiStatus("检查完成，原句与反馈已保存。")
      saveSentence(feedback)
    } catch (error) {
      setAiStatus(
        error instanceof Error && error.name === "Error" ? error.message :
        "暂时无法连接 AI 服务。请稍后再试，你仍然可以保存原句。",
      )
    } finally {
      setChecking(false)
    }
  }
  function exportArchive() {
    if (!archive.length) {
      setToast("句子库还是空的，先写下你的第一句吧。")
      return
    }
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(archive, null, 2)], {
        type: "application/json",
      }),
    )
    const link = document.createElement("a")
    link.href = url
    link.download = "podcast-sentence-archive.json"
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  async function importArchive(file: File) {
    try {
      const data: unknown = JSON.parse(await file.text())
      if (!Array.isArray(data) || data.some((entry) =>
        !entry || typeof entry !== "object" ||
        ["date", "topic", "original", "expanded"].some((key) => typeof entry[key] !== "string") ||
        ["rewrite", "note", "naturalness", "rewriteZh", "lessonId", "lessonTitle"].some((key) => entry[key] !== undefined && typeof entry[key] !== "string"),
      )) throw new Error("Invalid archive")
      const known = new Set(archive.map((entry) => JSON.stringify([entry.date, entry.topic, entry.original, entry.expanded])))
      const imported = (data as Entry[]).filter((entry) => {
        const key = JSON.stringify([entry.date, entry.topic, entry.original, entry.expanded])
        if (known.has(key)) return false
        known.add(key)
        return true
      })
      const next = [...archive, ...imported]
      if (!store("podcast-sentence-archive", next)) throw new Error("Storage unavailable")
      setArchive(next)
      setToast(`已导入 ${imported.length} 条句子，已有记录已保留。`)
    } catch {
      setToast("导入失败，请选择从句子库导出的 JSON 文件，并确认浏览器可以保存数据。")
    }
  }
  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <a
            className="brand"
            href="#"
            onClick={(event) => {
              event.preventDefault()
              switchPanel("warmup")
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <span className="brand-icon">
              <Icon name="headphones" size={23} />
            </span>
            <span>
              播客英语复习室<small>THE LISTENING ROOM</small>
            </span>
          </a>
          <nav className="top-nav" aria-label="主导航">
            <button
              className={panel !== "speak" ? "selected" : ""}
              onClick={() => switchPanel("warmup")}
            >
              今日复习
            </button>
            <button
              className={panel === "speak" ? "selected" : ""}
              onClick={showArchive}
            >
              我的句子库 <span>{archive.length}</span>
            </button>
          </nav>
          <div className="header-date">
            <Icon name="sun" size={19} />
            <span>
              {new Intl.DateTimeFormat("zh-CN", {
                timeZone: "Asia/Shanghai",
                month: "long",
                day: "numeric",
                weekday: "long",
              }).format(new Date())}
            </span>
            <span className="day-pill">DAY {dayLabel}</span>
          </div>
        </div>
      </header>
      <div className="page">
        <div className="lesson-switcher">
          <label htmlFor="lesson">学习内容</label>
          <select id="lesson" value={lesson.id} onChange={(event) => onLessonChange(event.target.value)}>
            {lessons.slice().reverse().map((item) => (
              <option key={item.id} value={item.id}>Day {String(item.day).padStart(2, "0")} · {item.date} · {item.title}</option>
            ))}
          </select>
          <span>已收录 {lessons.length} 期 · 可随时回看</span>
        </div>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="little-dot" /> A LITTLE PRACTICE, EVERY DAY
            </div>
            <h1>
              听过的，
              <br />
              变成<span>会说的。</span>
              <svg
                className="heading-spark"
                width="31"
                height="39"
                viewBox="0 0 31 39"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m5 19 8-14m4 22 11-6M4 32l7-1"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </h1>
            <p>
              把听到的好表达，慢慢变成自己的。
              <br />
              每天几分钟，让英语在生活里自然发生。
            </p>
            <div className="hero-meta">
              <span>
                <Icon name="clock" size={15} /> 约 {lesson.durationMinutes} 分钟
              </span>
              <i />
              <span>{cards.length} 个地道表达</span>
              <i />
              <span>{financeCards.length} 个{lesson.vocabularyLabel}</span>
            </div>
          </div>
          <article className="episode-card">
            <div className="episode-art">
              <span className="episode-day">
                DAY <b>{dayLabel}</b>
              </span>
              <PodcastArt />
              <span className="art-caption">listen. learn. grow.</span>
            </div>
            <div className="episode-copy">
              <div className="eyebrow">{lesson.date} · {lesson.kind === "video" ? "VIDEO" : "PODCAST"}</div>
              <span className="topic-tag">{lesson.tag}</span>
              <h2>{lesson.title}</h2>
              <div className="episode-source">
                <span className="npr-logo">
                  {lesson.sourceCode.slice(0, 3).toLowerCase().split("").map((letter, i) => <b key={i}>{letter}</b>)}
                </span>
                <span>{lesson.source}</span>
              </div>
              <a
                href={lesson.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="episode-link"
              >
                {lesson.kind === "video" ? "前往视频" : "前往播客节目"} <Icon name="arrow" size={16} />
              </a>
            </div>
          </article>
        </section>
        {lesson.overview && (
          <audio className="episode-player" key={lesson.id} controls preload="none" src={lesson.overview.audioUrl} aria-label="收听本期 Life Kit 原节目" />
        )}
        <div className="workspace">
          <aside className="practice-sidebar">
            <div className="sidebar-title">
              本期练习 <span>DAY {dayLabel}</span>
            </div>
            <nav className="practice-nav" aria-label="练习步骤">
              {lessonSteps.map((step, i) => (
                <button
                  key={step.id}
                  className={`practice-step ${
                    panel === step.id ? "active" : ""
                  }`}
                  onClick={() => switchPanel(step.id)}
                  aria-current={panel === step.id ? "step" : undefined}
                >
                  <span className="step-icon">
                    <Icon name={step.icon} size={21} />
                  </span>
                  <span className="step-text">
                    <b>{step.name}</b>
                    <small>{step.en}</small>
                  </span>
                  {done.includes(step.id) ? (
                    <span className="step-complete">✓</span>
                  ) : (
                    <span className="step-number">0{i + 1}</span>
                  )}
                </button>
              ))}
            </nav>
            <div className="progress-card">
              <div className="progress-title">
                <span>本期复习进度</span>
                <b>
                  {done.length}
                  <small> / 4</small>
                </b>
              </div>
              <div
                className="progress-track"
                role="progressbar"
                aria-label="本期复习进度"
                aria-valuenow={done.length}
                aria-valuemin={0}
                aria-valuemax={4}
              >
                <span style={{ width: `${done.length * 25}%` }} />
              </div>
              <p>
                {done.length === 4
                  ? "本期练习完成，做得真棒。"
                  : "不必着急，一小步也是进步。"}
              </p>
            </div>
            <div className="sidebar-note">
              <Icon name="leaf" size={22} />
              <p>
                不是记住所有单词，
                <br />
                而是多一个表达自己的方式。
              </p>
              <span>Small steps, real progress.</span>
            </div>
          </aside>
          <main className="practice-main">
            <section className={`practice-panel panel-${panel}`} key={panel}>
              <div className="panel-head">
                <div>
                  <div className="eyebrow">
                    {panel === "warmup"
                      ? "01 / WARM UP"
                      : panel === "quiz"
                        ? "02 / QUICK CHECK"
                        : panel === "finance"
                          ? "03 / VOCABULARY PRACTICE"
                          : "04 / MAKE IT YOURS"}
                  </div>
                  <h2>
                    {panel === "warmup"
                      ? "先凭记忆想一想"
                      : panel === "quiz"
                        ? "让好表达留下来"
                        : panel === "finance"
                          ? `把${lesson.vocabularyLabel}放进句子`
                          : "用表达说自己的事"}
                  </h2>
                  <p>
                    {panel === "warmup"
                      ? "先在心里回忆，再翻开卡片，看看你记住了多少。"
                      : panel === "quiz"
                        ? "选出最自然的表达，读一读它在句子里的样子。"
                        : panel === "finance"
                          ? "选一个合适的词，让这句话变得完整。"
                          : "从一句话开始，再加上一点属于你的细节。"}
                  </p>
                </div>
                <span className="time-badge">
                  <Icon name="clock" size={13} /> {current.time}
                </span>
              </div>
              {panel === "warmup" && (
                <>
                  <div className={`flashcard ${flipped ? "flipped" : ""}`}>
                    <div className="flashcard-top">
                      <span>
                        EXPRESSION {String(cardIndex + 1).padStart(2, "0")}
                      </span>
                      <button
                        className="sound-button"
                        onClick={pronounce}
                        aria-label="朗读当前表达"
                      >
                        <Icon name="volume" size={20} />
                      </button>
                    </div>
                    <button
                      className="flashcard-content"
                      onClick={() => {
                        setFlipped(!flipped)
                        mark("warmup", cardIndex)
                      }}
                      aria-label={
                        flipped ? "查看英文表达" : "翻面查看中文和例句"
                      }
                      aria-pressed={flipped}
                    >
                      {flipped ? (
                        <>
                          <span className="card-meaning">{card.m}</span>
                          <span className="card-example">{card.e}</span>
                          <span className="flip-label">
                            <Icon name="cards" size={15} /> 点击返回英文表达
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="expression">{card.w}</span>
                          <span className="expression-question">
                            这个表达，你还记得吗？
                          </span>
                          <span className="flip-label">
                            <Icon name="cards" size={15} /> 点击卡片，揭晓答案
                          </span>
                        </>
                      )}
                    </button>
                    <div className="card-dots">
                      {cards.map((_, index) => (
                        <button
                          key={index}
                          className={index === cardIndex ? "current" : ""}
                          onClick={() => changeCard(index)}
                          aria-label={`查看第 ${index + 1} 张卡片`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="card-controls">
                    <div className="card-pagination">
                      <button
                        className="previous-button"
                        onClick={() => changeCard(cardIndex - 1)}
                        aria-label="上一个表达"
                      >
                        <Icon name="arrow" className="rotate" size={18} />
                      </button>
                      <span>
                        <b>{String(cardIndex + 1).padStart(2, "0")}</b> /{" "}
                        {cards.length}
                      </span>
                      <button
                        className="primary next-card"
                        onClick={() => changeCard(cardIndex + 1)}
                      >
                        下一个 <Icon name="arrow" size={17} />
                      </button>
                    </div>
                    <button
                      className="text-button"
                      onClick={() =>
                        changeCard(
                          (cardIndex +
                            1 +
                            Math.floor(Math.random() * (cards.length - 1))) %
                            cards.length,
                        )
                      }
                    >
                      <Icon name="shuffle" size={17} /> 随机抽一张
                    </button>
                  </div>
                  <div className="practice-bottom">
                    <Icon name="spark" size={15} />
                    <span>小挑战：翻面前，试着用这个表达在心里造一句话。</span>
                  </div>
                </>
              )}
              {(panel === "quiz" || panel === "finance") &&
                (() => {
                  const isQuiz = panel === "quiz"
                  const selected = isQuiz ? answer : financeAnswer
                  const options = isQuiz ? quiz.opts : finance.opts
                  const correctIndex = isQuiz
                    ? quiz.a
                    : finance.opts.indexOf(finance.ans)
                  return (
                    <>
                      <div className="question-counter">
                        <span>
                          {isQuiz
                            ? "CHOOSE THE BEST EXPRESSION"
                            : "COMPLETE THE SENTENCE"}
                        </span>
                        <b>
                          {(isQuiz ? quizIndex : financeIndex) + 1} /{" "}
                          {isQuiz ? quizzes.length : financeQs.length}
                        </b>
                      </div>
                      <h3 className="question">
                        {isQuiz ? (
                          quiz.q
                        ) : (
                          <>
                            {finance.before}
                            <span className="blank">______</span>
                            {finance.after}
                          </>
                        )}
                      </h3>
                      <div className="answers">
                        {options.map((option, index) => (
                          <button
                            key={index}
                            disabled={selected !== null}
                            className={`answer ${
                              selected !== null && index === correctIndex
                                ? "correct"
                                : ""
                            } ${
                              selected === index && index !== correctIndex
                                ? "wrong"
                                : ""
                            }`}
                            onClick={() => {
                              isQuiz
                                ? setAnswer(index)
                                : setFinanceAnswer(index)
                              mark(panel, isQuiz ? quizIndex : financeIndex)
                            }}
                          >
                            <span className="answer-letter">
                              {String.fromCharCode(65 + index)}
                            </span>
                            {option}
                            {selected !== null && index === correctIndex && (
                              <Icon name="check" size={19} />
                            )}
                          </button>
                        ))}
                      </div>
                      {!isQuiz && (
                        <div className="hint">小提示：{finance.hint}</div>
                      )}
                      {selected !== null && (
                        <div className="answer-feedback">
                          <b>
                            {selected === correctIndex
                              ? "答对了！把完整句子读一遍吧。"
                              : `还差一点，正确答案是「${options[correctIndex]}」。`}
                          </b>
                          <p>
                            {isQuiz
                              ? quiz.en.split("**").map((part, index) => index % 2 ? <strong key={index}>{part}</strong> : part)
                              : <>{finance.before}<strong>{finance.ans}</strong>{finance.after}</>}
                          </p>
                          <small>{isQuiz ? quiz.zh : finance.zh}</small>
                        </div>
                      )}
                      <div className="actions">
                        <button
                          className="primary"
                          disabled={selected === null}
                          onClick={() => {
                            if (isQuiz) {
                              setQuizIndex((quizIndex + 1) % quizzes.length)
                              setAnswer(null)
                            } else {
                              setFinanceIndex(
                                (financeIndex + 1) % financeQs.length,
                              )
                              setFinanceAnswer(null)
                            }
                          }}
                        >
                          下一题 <Icon name="arrow" size={17} />
                        </button>
                        <button
                          className="text-button"
                          onClick={() => {
                            if (isQuiz) {
                              setQuizIndex(0)
                              setAnswer(null)
                            } else {
                              setFinanceIndex(0)
                              setFinanceAnswer(null)
                            }
                          }}
                        >
                          <Icon name="shuffle" size={16} /> 重新开始
                        </button>
                      </div>
                    </>
                  )
                })()}
              {panel === "speak" && (
                <>
                  <div className="writing-prompt">
                    <span className="eyebrow">
                      TOPIC {promptIndex + 1} / {prompts.length}
                    </span>
                    <h3>{topic.topic}</h3>
                    <p>{topic.cn}</p>
                    <div className="word-chips">
                      {topic.words.map((word) => (
                        <span key={word}>{word}</span>
                      ))}
                    </div>
                  </div>
                  <label className="writing-label" htmlFor="sentence">
                    <span>1</span>先写出核心句
                  </label>
                  <textarea
                    id="sentence"
                    disabled={checking}
                    value={sentence}
                    onChange={(event) => {
                      setSentence(event.target.value)
                      saveDraft(event.target.value, expanded)
                    }}
                    placeholder="Try to use the expressions above…"
                  />
                  <label className="writing-label" htmlFor="expanded">
                    <span>2</span>加上一点具体细节 <small>可选</small>
                  </label>
                  <p className="writing-tip">{topic.follow}</p>
                  <textarea
                    id="expanded"
                    disabled={checking}
                    value={expanded}
                    onChange={(event) => {
                      setExpanded(event.target.value)
                      saveDraft(sentence, event.target.value)
                    }}
                    placeholder="When? Why? What happened next?"
                  />
                  <div className="actions writing-actions">
                    <button className="primary" disabled={checking} onClick={() => saveSentence()}>
                      <Icon name="book" size={17} /> 保存句子
                    </button>
                    <button
                      className="secondary"
                      onClick={() => endpoint ? void checkWriting() : openAISettings()}
                      disabled={checking}
                    >
                      <Icon name="spark" size={17} />{" "}
                      {checking ? "检查中…" : endpoint ? "AI 检查与润色" : "连接 AI（可选）"}
                    </button>
                    <button
                      className="text-button"
                      disabled={checking}
                      onClick={() => {
                        const nextIndex = (promptIndex + 1) % prompts.length
                        const draft = load<{ sentence: string; expanded: string }>(
                          `listening-room-draft:${lesson.id}:${nextIndex}`, { sentence: "", expanded: "" },
                        )
                        setPromptIndex(nextIndex)
                        setSentence(draft.sentence)
                        setExpanded(draft.expanded)
                        setAiStatus("")
                        setAiFeedback(null)
                      }}
                    >
                      换个话题
                    </button>
                  </div>
                  {aiStatus && (
                    <p className="ai-status" role="status">
                      {aiStatus}
                    </p>
                  )}
                  {aiFeedback && (
                    <div className="answer-feedback">
                      {Object.entries({
                        语法检查: aiFeedback.grammar,
                        地道性建议: aiFeedback.naturalness,
                        进阶改写: aiFeedback.rewrite,
                        中文释义: aiFeedback.rewriteZh,
                      }).map(
                        ([label, value]) =>
                          value && (
                            <div key={label}>
                              <b>{label}</b>
                              <p>{value}</p>
                            </div>
                          ),
                      )}
                    </div>
                  )}
                  <div className="sentence-archive" ref={archiveRef}>
                    <div className="archive-head">
                      <h3>
                        我的每日句子库 <span>{archive.length}</span>
                      </h3>
                      <div>
                        <input ref={importRef} type="file" accept=".json,application/json" hidden onChange={(event) => {
                          const file = event.target.files?.[0]
                          if (file) void importArchive(file)
                          event.target.value = ""
                        }} />
                        <button className="icon-button" aria-label="导入句子库" onClick={() => importRef.current?.click()}>
                          <Icon name="book" size={18} />
                        </button>
                        <button
                          className="icon-button"
                          aria-label="设置 AI 服务"
                          onClick={openAISettings}
                        >
                          <Icon name="settings" size={18} />
                        </button>
                        <button
                          className="icon-button"
                          aria-label="导出句子库"
                          onClick={exportArchive}
                        >
                          <Icon name="download" size={18} />
                        </button>
                      </div>
                    </div>
                    {archive.length ? (
                      archive
                        .slice()
                        .reverse()
                        .map((entry, index) => (
                          <article className="archive-entry" key={index}>
                            <small>
                              {entry.date} · {entry.topic}{entry.lessonTitle ? ` · ${entry.lessonTitle}` : ""}
                            </small>
                            <p>{entry.original}</p>
                            {entry.expanded && <p>{entry.expanded}</p>}
                            {entry.rewrite && (
                              <p className="archive-rewrite">
                                AI 改写：{entry.rewrite}
                              </p>
                            )}
                            {entry.note && <small>反馈：{entry.note}</small>}
                            {entry.naturalness && <p className="archive-rewrite">表达建议：{entry.naturalness}</p>}
                            {entry.rewriteZh && <small>改写译文：{entry.rewriteZh}</small>}
                          </article>
                        ))
                    ) : (
                      <div className="archive-empty">
                        <Icon name="pen" size={25} />
                        <p>每一个写下的句子，都是进步的痕迹。</p>
                        <small>句子仅保存在此设备的浏览器中。</small>
                      </div>
                    )}
                  </div>
                </>
              )}
            </section>
            <div className="expression-library" ref={libraryRef}>
              <button
                className="library-toggle"
                onClick={() => setLibrary(!library)}
                aria-expanded={library}
              >
                <span className="library-icon">
                  <Icon name="book" size={21} />
                </span>
                <span>
                  <b>本期表达库</b>
                  <small>{cards.length} 个地道表达 · {financeCards.length} 个{lesson.vocabularyLabel}，随时回来看看</small>
                </span>
                <Icon
                  name="chevron"
                  size={18}
                  className={library ? "down" : ""}
                />
              </button>
              {library && (
                <div className="library-content">
                  <div className="library-tabs">
                    <button
                      className={libraryTab === "expressions" ? "active" : ""}
                      onClick={() => setLibraryTab("expressions")}
                    >
                      地道表达 · {cards.length}
                    </button>
                    <button
                      className={libraryTab === "finance" ? "active" : ""}
                      onClick={() => setLibraryTab("finance")}
                    >
                      {lesson.vocabularyLabel} · {financeCards.length}
                    </button>
                  </div>
                  {(libraryTab === "expressions"
                    ? cards.map((item) => [item.w, item.m, item.e])
                    : financeCards
                  ).map(([word, meaning, example]) => (
                    <article className="library-entry" key={word}>
                      <h3>{word}</h3>
                      <span>{meaning}</span>
                      <p>{example}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </main>
          <aside className="insight-sidebar">
            <div className="tip-card">
              <div className="tip-title">
                <span>
                  <Icon name="sun" size={19} />
                </span>
                让复习更有效
              </div>
              <h3>
                先回忆，
                <br />
                再看答案。
              </h3>
              <p>
                主动回忆比反复阅读更有效。
                <br />
                哪怕只想起一点点，
                <br />
                也是在帮记忆扎根。
              </p>
              <div className="tip-footer">
                <span /> A LITTLE TIP FOR YOU
              </div>
              <svg
                className="plant-art"
                width="73"
                height="80"
                viewBox="0 0 73 80"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M36 74V25m0 30c-21 0-29-15-29-26 22 0 29 13 29 26Zm0-14C59 41 66 25 66 14 43 14 36 27 36 41Z"
                  stroke="#699979"
                  strokeWidth="2"
                />
                <path d="m18 43 18 12 18-27" stroke="#699979" strokeWidth="2" />
                <path
                  d="M23 74h26"
                  stroke="#699979"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <button className="archive-shortcut" onClick={showArchive}>
              <span className="shortcut-icon">
                <Icon name="pen" size={20} />
              </span>
              <b>把表达变成你的</b>
              <p>
                写下一句关于自己的话，
                <br />
                比记住十遍更有意义。
              </p>
              <span className="shortcut-link">
                去写一句 <Icon name="arrow" size={17} />
              </span>
            </button>
            <button className="library-shortcut" onClick={openLibrary}>
              <Icon name="book" size={17} /> 浏览本期完整表达库{" "}
              <Icon name="arrow" size={16} />
            </button>
          </aside>
        </div>
        <footer className="page-footer">
          <span>
            <Icon name="headphones" size={15} /> 听一点，记一点，说一点。
          </span>
          <span>Made for your everyday English.</span>
        </footer>
      </div>
      {toast && (
        <div className="toast" role="status">
          <Icon name="check" size={18} />
          {toast}
        </div>
      )}
      {settingsOpen && (
        <div className="modal-backdrop" onClick={() => setSettingsOpen(false)}>
          <section
            className="settings-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === "Escape") setSettingsOpen(false)
            }}
          >
            <button
              className="modal-close icon-button"
              onClick={() => setSettingsOpen(false)}
              aria-label="关闭设置"
            >
              <Icon name="close" />
            </button>
            <Icon name="spark" size={28} />
            <h2 id="settings-title">AI 批改设置</h2>
            <p>
              AI 批改为可选功能。留空也可以练习和保存句子，填写自己的批改服务地址即可连接。
            </p>
            <label htmlFor="endpoint">批改 API 地址（可选）</label>
            <input
              autoFocus
              id="endpoint"
              type="url"
              placeholder="https://your-service.example/api/review"
              value={endpointDraft}
              onChange={(event) => setEndpointDraft(event.target.value)}
            />
            <small>
              这里只填写服务地址，不填写 API key。清空并保存即可关闭 AI 批改。
            </small>
            <button
              className="primary"
              onClick={() => {
                const nextEndpoint = endpointDraft.trim()
                if (nextEndpoint) {
                  try {
                    const parsed = new URL(nextEndpoint)
                    if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error("Invalid URL")
                  } catch {
                    setToast("请输入完整的 HTTP 或 HTTPS 服务地址，或留空关闭。")
                    return
                  }
                }
                let saved = true
                try {
                  if (nextEndpoint) localStorage.setItem("podcast-ai-endpoint", nextEndpoint)
                  else localStorage.removeItem("podcast-ai-endpoint")
                } catch {
                  saved = false
                }
                setSettingsOpen(false)
                setEndpoint(nextEndpoint)
                setAiStatus("")
                setAiFeedback(null)
                setToast(
                  !saved ? "设置仅在本次会话有效。" : nextEndpoint ? "AI 服务地址已保存。" : "AI 批改已关闭。",
                )
              }}
            >
              保存设置 <Icon name="arrow" size={17} />
            </button>
          </section>
        </div>
      )}
    </div>
  )
}
