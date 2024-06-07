import { firebaseRealtimeDB } from './firebaseDB'
import { child, get, ref, set, update, remove } from 'firebase/database'

export async function saveToRealtimeDB(path, data) {
  try {
    await set(ref(firebaseRealtimeDB, path), data)
    return true
  } catch {
    return false
  }
}

export async function loadFromRealtimeDB(path) {
  try {
    const dbRef = ref(firebaseRealtimeDB)
    const snapshot = await get(child(dbRef, path))

    if (snapshot.exists()) {
      return snapshot.val()
    }
    return false
  } catch {
    return false
  }
}

export async function editToRealtimeDB(path, newData) {
  try {
    const snapshot = await loadFromRealtimeDB(path)

    if (snapshot) {
      await update(ref(firebaseRealtimeDB, path), newData)
      return true
    }
    return false
  } catch {
    return false
  }
}

export async function deleteFromRealtimeDB(path) {
  try {
    const snapshot = await loadFromRealtimeDB(path)

    if (snapshot) {
      await remove(ref(firebaseRealtimeDB, path))
      return true
    }
    return false
  } catch {
    return false
  }
}

export async function saveOrEditToRealtimeDB(path, data) {
  const d = await loadFromRealtimeDB(path)

  if (!d) await saveToRealtimeDB(path, data)
  if (d) await editToRealtimeDB(path, data)
}
