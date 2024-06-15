import { uploadBytesToStore } from '../js/db/db/firebaseStore'
import { loadFromLocalStorage } from '../js/db/local/localStorage'

export async function uploadAvatar(file) {
  const id = loadFromLocalStorage('games').accounts.active
  const uploaded = await uploadBytesToStore(`users/${id}/avatar`, file)
  return uploaded
}
