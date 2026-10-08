import { useRef, useState } from "react"

type Mark = { start: number; end: number }
type BrowserTranslator = { translate: (text: string) => Promise<string>; destroy?: () => void }
type TranslatorFactory = { create: (options: { sourceLanguage: string; targetLanguage: string }) => Promise<BrowserTranslator> }

function loadMarks(id: string, length: number): Mark[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(`listening-room-marks:${id}`) || "[]")
    if (!Array.isArray(value)) return []
    return mergeMarks(value.filter((item): item is Mark =>
      item && Number.isInteger(item.start) && Number.isInteger(item.end) &&
      item.start >= 0 && item.start < item.end && item.end <= length,
    ))
  } catch { return [] }
}

function mergeMarks(marks: Mark[]): Mark[] {
  const sorted = [...marks].sort((a, b) => a.start - b.start)
  return sorted.reduce<Mark[]>((result, next) => {
    const last = result[result.length - 1]
    if (last && next.start <= last.end) last.end = Math.max(last.end, next.end)
    else result.push({ ...next })
    return result
  }, [])
}

export default function TranscriptReader({ id, transcript, expressions, readingKind, readingNote }: {
  id: string
  transcript: string
  expressions: { w: string; m: string }[]
  readingKind?: "study-guide"
  readingNote?: string
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const translatorRef = useRef<BrowserTranslator | null>(null)
  const [marks, setMarks] = useState(() => loadMarks(id, transcript.length))
  const [selection, setSelection] = useState<Mark | null>(null)
  const [translation, setTranslation] = useState("")
  const [translating, setTranslating] = useState(false)

  function captureSelection() {
    const selected = window.getSelection()
    const root = contentRef.current
    if (!selected || selected.isCollapsed || !root || !selected.rangeCount) return
    const range = selected.getRangeAt(0)
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return
    const before = document.createRange()
    before.selectNodeContents(root)
    before.setEnd(range.startContainer, range.startOffset)
    const start = before.toString().length
    const end = start + range.toString().length
    if (start === end || end > transcript.length) return
    setSelection({ start, end })
    setTranslation("")
  }

  function highlight() {
    if (!selection) return
    const next = mergeMarks([...marks, selection])
    try { localStorage.setItem(`listening-room-marks:${id}`, JSON.stringify(next)) }
    catch { setTranslation("浏览器无法保存高亮；本次打开期间仍可查看。") }
    setMarks(next)
    setSelection(null)
    window.getSelection()?.removeAllRanges()
  }

  async function translateSelection() {
    if (!selection) return
    const word = transcript.slice(selection.start, selection.end).trim()
    const known = expressions.find(({ w }) => w.toLocaleLowerCase() === word.toLocaleLowerCase())
    if (known) { setTranslation(known.m); return }
    const factory = (window as Window & { Translator?: TranslatorFactory }).Translator
    if (!factory) {
      setTranslation("当前浏览器不支持本地划词翻译。可先查看已导入表达的释义，或换用支持 Translator API 的桌面浏览器。")
      return
    }
    setTranslating(true)
    setTranslation("正在翻译；首次使用可能需要下载语言包…")
    try {
      // create() is started directly from the button click for browsers requiring user activation.
      const translator = translatorRef.current ?? await factory.create({ sourceLanguage: "en", targetLanguage: "zh" })
      translatorRef.current = translator
      setTranslation(await translator.translate(word))
    } catch {
      setTranslation("本地翻译暂不可用。请确认浏览器已支持英译中并允许下载语言包。")
    } finally { setTranslating(false) }
  }

  const chunks: React.ReactNode[] = []
  let cursor = 0
  for (const mark of marks) {
    if (mark.start > cursor) chunks.push(transcript.slice(cursor, mark.start))
    chunks.push(<mark key={`${mark.start}-${mark.end}`}>{transcript.slice(mark.start, mark.end)}</mark>)
    cursor = mark.end
  }
  if (cursor < transcript.length) chunks.push(transcript.slice(cursor))

  return (
    <section className="transcript-reader" aria-labelledby="transcript-title">
      <div className="transcript-head">
        <div><span className="eyebrow">{readingKind === "study-guide" ? "ORIGINAL STUDY GUIDE" : "LISTEN & READ"}</span><h2 id="transcript-title">{readingKind === "study-guide" ? "原创英文学习导读" : "边听边读"}</h2></div>
        <span>选中英文后可翻译或高亮</span>
      </div>
      {readingNote && <p className="reading-note">{readingNote}</p>}
      {selection && <div className="selection-tools">
        <span title={transcript.slice(selection.start, selection.end)}>{transcript.slice(selection.start, selection.end)}</span>
        <button type="button" onClick={() => void translateSelection()} disabled={translating}>翻译选中</button>
        <button type="button" onClick={highlight}>标为高亮</button>
      </div>}
      {translation && <p className="selection-translation" role="status">{translation}</p>}
      <div className="transcript-text" ref={contentRef} onMouseUp={captureSelection} onKeyUp={captureSelection}>{chunks}</div>
      {marks.length > 0 && <button className="clear-highlights" type="button" onClick={() => {
        setMarks([])
        localStorage.removeItem(`listening-room-marks:${id}`)
      }}>清除本期高亮</button>}
    </section>
  )
}
