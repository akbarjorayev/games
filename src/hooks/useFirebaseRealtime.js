import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { firebaseRealtimeDB } from '../js/db/db/firebaseDB'

export function useFirebaseRealtime(path) {
  const [data, setData] = useState(false)

  useEffect(() => {
    const dataRef = ref(firebaseRealtimeDB, path)

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const value = snapshot.val()
      setData(value)
    })

    return () => unsubscribe()
  }, [path])

  return [data]
}
