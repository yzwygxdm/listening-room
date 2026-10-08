import type { Lesson } from "./types"

export type LocalLesson = { lesson: Lesson; audio?: Blob; createdAt?: number }

const DATABASE = "listening-room-library"
const STORE = "lessons"

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE, 1)
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE))
        request.result.createObjectStore(STORE, { keyPath: "lesson.id" })
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function readLocalLessons(): Promise<LocalLesson[]> {
  const db = await openDatabase()
  try {
    return await new Promise((resolve, reject) => {
      const request = db.transaction(STORE, "readonly").objectStore(STORE).getAll()
      request.onsuccess = () => resolve((request.result as LocalLesson[])
        .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0)))
      request.onerror = () => reject(request.error)
    })
  } finally {
    db.close()
  }
}

export async function saveLocalLesson(record: LocalLesson): Promise<void> {
  const db = await openDatabase()
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE, "readwrite")
      transaction.objectStore(STORE).put(record)
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
      transaction.onabort = () => reject(transaction.error)
    })
  } finally {
    db.close()
  }
}

export async function saveLocalLessons(records: LocalLesson[]): Promise<void> {
  if (!records.length) return
  const db = await openDatabase()
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE, "readwrite")
      const store = transaction.objectStore(STORE)
      for (const record of records) store.add(record)
      transaction.oncomplete = () => resolve()
      transaction.onerror = () => reject(transaction.error)
      transaction.onabort = () => reject(transaction.error ?? new Error("无法保存学习包。"))
    })
  } finally { db.close() }
}
