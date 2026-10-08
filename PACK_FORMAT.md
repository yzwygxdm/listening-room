# Listening Room 学习包格式 v1

学习包是一个 UTF-8 JSON 文件，只包含文字学习材料，不包含音频、模型 key、支付或授权信息。用户从网站的“导入节目”窗口选择文件；导入后可补充自己有权使用的音频。示范文件：[public/sample-pack.json](public/sample-pack.json)。

```json
{
  "format": "listening-room-pack-v1",
  "title": "节目或课程标题",
  "sourceUrl": "https://example.com/original",
  "transcript": "English transcript or original study script...",
  "expressions": [
    {
      "word": "clear my head",
      "meaning": "理清思绪",
      "example": "A short walk helps me clear my head.",
      "exampleZh": "短暂散步能帮助我理清思绪。"
    }
  ]
}
```

要求：

- `format` 固定为 `listening-room-pack-v1`；单文件不超过 1 MB。
- `title`、`transcript`、`expressions` 必填；`sourceUrl` 和每条的 `exampleZh` 可选。
- 单期最多 100 条不重复表达；每条英文例句须包含对应 `word`，用于生成填空题。
- 发布前人工核对表达含义、例句、选择题干扰项和原文出处。自动生成的练习不是播客逐字引文。
- 如要出售，建议只放入有权使用的原文和原创教学内容；不要直接打包第三方音频或完整逐字稿，除非已取得相应授权。

`listening-room-backup-v1` 是用户个人资料库备份，不是可销售的学习包；两者不能互换。备份不含音频文件，恢复后须重新添加。

## 多期合集 v1

[Life Kit 首期学习包](public/life-kit-pack-01.json)使用 `listening-room-bundle-v1`。它把 2026-10-01、10-05、10-06 的三期材料作为独立章节导入，每章保留原有的表达、主题词汇、选择题、填空题和造句。导入已有章节时会跳过，不会覆盖进度或后来添加的音频。合集文件同样不超过 1 MB。

每章的 `transcript` 字段在这一格式中存放**原创英文学习导读**，并以 `readingKind: "study-guide"` 和 `readingNote` 在页面明确标识；不是第三方节目逐字稿。`sourceUrl` 只指向原节目页面，合集不打包原节目音频或完整逐字稿。完整的章节字段可参照示例文件与 `src/learningPack.ts` 的校验规则。生成脚本是 `scripts/build-life-kit-pack.mjs`。
