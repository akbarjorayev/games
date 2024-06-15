import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage'
import { firebaseStorage } from './firebaseDB'

export async function uploadBytesToStore(path, file) {
  const storageRef = ref(firebaseStorage, path)

  return uploadBytes(storageRef, file)
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
