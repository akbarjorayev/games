import { useState, useEffect } from 'react'

import { loadFromFirestore } from '../js/db/db/firestore'

export const useFirestore = (collectionName, docName, ...deps) => {
  const [firestoreData, setFirestoreData] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const data = await loadFromFirestore(collectionName, docName)
      setFirestoreData(data ? data : false)
    }

    loadData()
  }, [collectionName, docName, ...deps])

  return [firestoreData, setFirestoreData]
}

export const useFirestoreAll = (collectionName, docNames, ...deps) => {
  const [firestoreData, setFirestoreData] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const data = await Promise.all(
        docNames.map(async (docName) => {
          return await loadFromFirestore(collectionName, docName)
        })
      )
      setFirestoreData(data ? data : false)
    }

    loadData()
  }, [collectionName, docNames.length, ...deps])

  return [firestoreData, setFirestoreData]
}
