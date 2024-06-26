import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage'
import { firebaseStorage } from './firebaseDB'

export async function uploadString4ToStore(path, message4) {
  const storageRef = ref(firebaseStorage, path)

  return uploadString(storageRef, message4, 'data_url')
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

export async function downloadFromStore(path) {
  const starsRef = ref(firebaseStorage, path)

  return getDownloadURL(starsRef)
    .then((url) => {
      return url
    })
    .catch(() => {
      return false
    })
}

export async function deleteFromStore(path) {
  const desertRef = ref(firebaseStorage, path)

  return deleteObject(desertRef)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}
