import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  increment,
  arrayUnion,
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
  } catch {
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
  } catch {
    return false
  }
}

export async function deleteFromFirestore(collectionName, docName) {
  const docRef = doc(firestoreDB, collectionName, docName)

  try {
    await deleteDoc(docRef)
    return true
  } catch {
    return false
  }
}

export async function incrementField(
  collectionName,
  docName,
  fieldName,
  incrementBy
) {
  const data = await loadFromFirestore(collectionName, docName)

  if (!data[fieldName]) {
    await editFirestore(collectionName, docName, { [fieldName]: incrementBy })
    return
  }

  const docRef = doc(firestoreDB, collectionName, docName)

  try {
    await updateDoc(docRef, {
      [fieldName]: increment(incrementBy),
    })
    return true
  } catch {
    return false
  }
}

export async function addToArrayFirestore(
  collectionName,
  docName,
  arrayName,
  data
) {
  const existsData = await loadFromFirestore(collectionName, docName)

  if (existsData[arrayName]?.length === 0) {
    await editFirestore(collectionName, docName, { [arrayName]: [data] })
    return
  }

  const docRef = doc(firestoreDB, collectionName, docName)
  await updateDoc(docRef, {
    [arrayName]: arrayUnion(data),
  })
}
