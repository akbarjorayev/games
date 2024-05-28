import { useEffect, useState } from 'react'

import Avatar from '../../../components/Avatar/Avatar'
import AccountPageFollow from './components/AccountPageFollow'
import AccountPageInfo from './components/AccountPageInfo'

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
      <div className="con_bg_none mar_ce blur_theme_bg w_max">
        Account is loading
      </div>
    )

  return (
    <>
      <div className="d_f_ai_ce list_y">
        <Avatar
          letter={account?.user.name[0]}
          style={{ fontSize: '50px', width: '100px' }}
        />
        <AccountPageFollow />
        <AccountPageInfo account={account} setAccount={setAccount} />
      </div>
    </>
  )
}
