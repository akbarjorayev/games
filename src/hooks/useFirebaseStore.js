import { useState, useEffect } from 'react'

import { downloadFromStore } from '../js/db/db/firebaseStore'

export const useFirebaseStore = (path, ...deps) => {
  const [data, setData] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      const storeData = await downloadFromStore(path)
      setData(storeData ? storeData : false)
    }

    loadData()
  }, [path, ...deps])

  return [data, setData]
}
