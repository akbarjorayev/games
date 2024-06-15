import { ref, uploadBytes } from 'firebase/storage'
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
