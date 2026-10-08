# Listening Room maintenance

This is the user's Figma-refined English study app. Keep its visual design when adding learning content.

- The user supplies podcast/video links, transcripts, or notes, or explicitly asks to find public sources for a show/date range. In the latter case verify the release inventory with the official feed and document the check time. Add one complete file under `src/lessons/`; `src/data.ts` discovers lessons automatically. Use `src/types.ts` and `templates/lesson.ts.example` as the schema.
- An optional `overview` provides concise takeaways, the public original audio URL, a transcript reference link, and a clear source/original-practice note. Do not reproduce full copyrighted transcripts. Re-releases use their current release date and separately identify the original date. Do not invent daily lessons on dates without verified releases.
- The user removed the visible episode overview. Render only the audio controls below the episode card; retain source/overview metadata in lesson data and CONTENT_SOURCES.md without showing the removed prose or disclosure panel.
- Keep existing lesson ids and files stable so past lessons, progress, and drafts remain available. Use a new id for new material. Do not turn validation fixtures into real lessons.
- Fill source metadata accurately. Generated practice examples must not be presented as verbatim podcast/video quotations. Match practice coverage to the complete supplied expression list.
- UI metadata and counts come from the selected lesson. Do not reintroduce hardcoded Day 01 titles or counts. Keep the expression library collapsed by default.
- The vocabulary exercise is named "词汇填空" for every lesson. Use the generic "主题词汇" label in vocabulary counts and the library; do not name the exercise after a particular subject such as finance.
- The browser holds progress/drafts per lesson and the shared sentence archive. Preserve the archive's JSON import/export compatibility. Switching lessons must not mix progress or lose writing drafts.
- This is now a frontend-only GitHub upload project. AI review is optional and disabled by default. The only AI setting is an external review API URL; clearing it disables review. Never add provider keys or reload private local configuration through Vite/the launcher. Do not restore the removed bundled review backend. The external service contract is documented in API.md.
- Never print credentials or include environment files in archives/build assets. An API failure must not produce a success message or save fabricated feedback.
- Check TypeScript, build, and the relevant browser interactions after a substantive update. Do not publish, push to Figma, or schedule automatic content collection merely because content was added locally.
