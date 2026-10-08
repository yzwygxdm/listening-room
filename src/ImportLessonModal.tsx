import { useState } from "react"
import { createLocalLesson, type Expression } from "./createLocalLesson"
import { parseLearningPack } from "./learningPack"
import { saveLocalLesson, type LocalLesson } from "./localLessons"

const example = "make sense of | 理解；理清 | Writing helps me make sense of a confusing week. | 写下来有助于我理清混乱的一周。"

export default function ImportLessonModal({ onClose, onImported }: {
  onClose: () => void
  onImported: (record: LocalLesson) => void
}) {
  const [title, setTitle] = useState("")
  const [sourceUrl, setSourceUrl] = useState("")
  const [audio, setAudio] = useState<File | null>(null)
  const [transcript, setTranscript] = useState("")
  const [expressions, setExpressions] = useState("")
  const [packExpressions, setPackExpressions] = useState<Expression[] | null>(null)
  const [packName, setPackName] = useState("")
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")

  async function importLesson(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError("")
    try {
      const lesson = createLocalLesson({ title, sourceUrl, audio, transcript,
        expressions: packExpressions ?? expressions })
      const record = { lesson, audio: audio ?? undefined, createdAt: Date.now() }
      await saveLocalLesson(record)
      onImported(record)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "导入失败，请检查浏览器可用空间。")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="import-modal" role="dialog" aria-modal="true" aria-labelledby="import-title"
        onClick={(event) => event.stopPropagation()} onSubmit={(event) => void importLesson(event)}>
        <button type="button" className="import-close" onClick={onClose} aria-label="关闭导入">×</button>
        <span className="eyebrow">BUILD YOUR OWN LIBRARY</span>
        <h2 id="import-title">导入一段自己的播客学习材料</h2>
        <p>音频、逐字稿和表达只保存在此浏览器，不会上传到本站服务器。使用者请自行确认材料的使用权限。</p>
        <div className="pack-import">
          <label htmlFor="import-pack">已有学习包？先选择 JSON 文件，自动填入学习材料</label>
          <input id="import-pack" type="file" accept=".json,application/json" onChange={(event) => {
            const file = event.target.files?.[0]
            if (!file) return
            if (file.size > 1024 * 1024) { setError("学习包不能超过 1 MB。"); return }
            void file.text().then((text) => {
              const pack = parseLearningPack(text)
              setTitle(pack.title)
              setSourceUrl(pack.sourceUrl ?? "")
              setTranscript(pack.transcript)
              setPackExpressions(pack.expressions)
              setExpressions(pack.expressions.map(({ word, meaning, example, exampleZh }) =>
                [word, meaning, example, exampleZh].join(" | ")).join("\n"))
              setPackName(file.name)
              setError("")
            }).catch((cause) => setError(cause instanceof Error ? cause.message : "无法读取学习包。"))
          }} />
          {packName && <small>已读取 {packName}；可继续添加自己的音频文件。</small>}
        </div>
        <label htmlFor="import-title-field">节目标题</label>
        <input id="import-title-field" required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="例如：一段关于日常习惯的播客" />
        <label htmlFor="import-source">原节目链接（可选）</label>
        <input id="import-source" type="url" value={sourceUrl} onChange={(event) => setSourceUrl(event.target.value)} placeholder="https://..." />
        <label htmlFor="import-audio">音频文件（可选，导入后也能补充）</label>
        <input id="import-audio" type="file" accept="audio/*,.mp3,.m4a,.wav,.ogg" onChange={(event) => setAudio(event.target.files?.[0] ?? null)} />
        <label htmlFor="import-transcript">英文逐字稿</label>
        <input type="file" accept=".txt,.srt,.vtt,text/plain,text/vtt" aria-label="从文件导入逐字稿"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (!file) return
            if (file.size > 1024 * 1024) { setError("逐字稿文件不能超过 1 MB。"); return }
            void file.text().then((text) => { setTranscript(text); setError("") })
              .catch(() => setError("无法读取逐字稿文件。"))
          }} />
        <textarea id="import-transcript" required value={transcript} onChange={(event) => setTranscript(event.target.value)} placeholder="也可以把英文逐字稿粘贴在这里…" />
        <label htmlFor="import-expressions">整理好的表达（每行一条）</label>
        <p className="import-format">格式：英文表达 | 中文含义 | 含有该表达的英文例句 | 例句中文（可选）</p>
        <textarea id="import-expressions" required value={expressions} onChange={(event) => {
          setExpressions(event.target.value); setPackExpressions(null)
        }} placeholder={example} />
        {error && <p className="import-error" role="alert">{error}</p>}
        <button className="primary" type="submit" disabled={busy}>{busy ? "正在保存到浏览器…" : "导入并开始学习"}</button>
        <small>没有音频也可先导入学习包并做练习，之后补充自己有权使用的音频。资料仅存此浏览器，请定期导出资料库备份。</small>
      </form>
    </div>
  )
}
