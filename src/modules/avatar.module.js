import {
  deleteFromStore,
  downloadFromStore,
  uploadBytesToStore,
} from '../js/db/db/firebaseStore'
import { loadFromLocalStorage } from '../js/db/local/localStorage'

export async function uploadAvatar(file) {
  const id = loadFromLocalStorage('games').accounts.active
  const path = `users/${id}/avatar`

  return file
    ? await uploadBytesToStore(path, file)
    : await deleteFromStore(path)
}

export async function downloadAvatar(id) {
  const avatarID = id || loadFromLocalStorage('games').accounts.active
  const avatar = await downloadFromStore(`users/${avatarID}/avatar`)
  return avatar
}
