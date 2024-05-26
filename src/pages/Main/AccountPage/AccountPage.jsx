import { useEffect, useState } from 'react'

import Avatar from '../../../components/Avatar/Avatar'

import { loadFromLocalStorage } from '../../../js/db/local/localStorage'
import { loadFromFirestore } from '../../../js/db/db/firestore'

import './AccountPage.css'

export default function AccountPage() {
  const [account, setAccount] = useState(false)

  useEffect(() => {
    const id = loadFromLocalStorage('games').accounts.active
    async function loadData() {
      const data = await loadFromFirestore('accounts', id)
      setAccount(data)
    }
    loadData()
  }, [])

  if (!account)
    return (
      <>
        <div className="d_f_jc_ce">'Account Loading...'</div>
      </>
    )

  return (
    <>
      <div className="d_f_jc_ce">
        <Avatar
          letter={account.name[0]}
          style={{ fontSize: '50px', width: '100px' }}
        />
      </div>
    </>
  )
}
