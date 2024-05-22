import { collection, setDoc, doc } from 'firebase/firestore'
import { firestoreDB } from './firebaseDB'

export function saveFirestore(collectionName, docName, data) {
  const dataRef = collection(firestoreDB, collectionName)
  return setDoc(doc(dataRef, docName), data)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}
