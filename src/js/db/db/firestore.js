import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
} from 'firebase/firestore'
import { firestoreDB } from './firebaseDB'

export async function saveFirestore(collectionName, docName, data) {
  const dataRef = collection(firestoreDB, collectionName)

  try {
    await setDoc(doc(dataRef, docName), data)
    return true
  } catch {
    return false
  }
}

export async function loadFromFirestore(collectionName, docName) {
  try {
    const docRef = doc(firestoreDB, collectionName, docName)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) return docSnap.data()
    return false
  } catch (error) {
    return false
  }
}

export async function editFirestore(collectionName, docName, newData) {
  try {
    const docRef = doc(firestoreDB, collectionName, docName)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await setDoc(docRef, newData, { merge: true })
      return true
    }
    return false
  } catch (error) {
    return false
  }
}

export async function deleteFromFirestore(collectionName, docName) {
  const docRef = doc(firestoreDB, collectionName, docName)

  try {
    await deleteDoc(docRef)
    return true
  } catch (error) {
    return false
  }
}

export async function incrementField(
  collectionName,
  docName,
  fieldName,
  incrementBy
) {
  const docRef = doc(firestoreDB, collectionName, docName)

  try {
    await updateDoc(docRef, {
      [fieldName]: increment(incrementBy),
    })
    return true
  } catch (err) {
    return false
  }
}
