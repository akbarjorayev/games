import {
  deleteFromStore,
  downloadFromStore,
  uploadString4ToStore,
} from '../js/db/db/firebaseStore'
import { loadFromLocalStorage } from '../js/db/local/localStorage'

export async function uploadAvatar(file, iID) {
  const id = iID || loadFromLocalStorage('games').accounts.active
  const path = `users/${id}/avatar`

  return file
    ? await uploadString4ToStore(path, file)
    : await deleteFromStore(path)
}

export async function downloadAvatar(id) {
  const avatarID = id || loadFromLocalStorage('games').accounts.active
  const avatar = await downloadFromStore(`users/${avatarID}/avatar`)
  return avatar
}
