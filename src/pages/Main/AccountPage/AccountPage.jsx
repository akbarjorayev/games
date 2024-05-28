import { useEffect, useState } from 'react'

import Avatar from '../../../components/Avatar/Avatar'
import AccountPageMenu from './components/AccountPageMenu'
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
      <div className="mar_ce d_f_ce list_y account_con">
        <div className="w_100 d_f_ce pos_r">
          <Avatar
            letter={account?.user.name[0]}
            style={{ fontSize: '50px', width: '100px' }}
          />
          <AccountPageMenu />
        </div>
        <AccountPageFollow />
        <AccountPageInfo account={account} setAccount={setAccount} />
      </div>
    </>
  )
}
