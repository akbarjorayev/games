import {
  downloadFromStore,
  uploadBytesToStore,
} from '../js/db/db/firebaseStore'
import { loadFromLocalStorage } from '../js/db/local/localStorage'

export async function uploadAvatar(file) {
  const id = loadFromLocalStorage('games').accounts.active
  const uploaded = await uploadBytesToStore(`users/${id}/avatar`, file)
  return uploaded
}

export async function downloadAvatar(id) {
  const avatarID = id || loadFromLocalStorage('games').accounts.active
  const avatar = await downloadFromStore(`users/${avatarID}/avatar`)
  return avatar
}
