import { useRef } from 'react'

import Avatar from '../../components/Avatar/Avatar'
import Menu from '../../components/Menu/Menu'
import AccountPageNonAuth from './components/AccountPageNonAuth'
import AccountPageMenu from './components/AccountPageMenu'
import AccountPageFollow from './components/AccountPageFollow'
import AccountPageInfo from './components/AccountPageInfo'

import { useFirestore } from '../../hooks/useFirestore'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import './AccountPage.css'

const ACCOUNT_STATUS = {
  nonAuth: 'non-auth',
}

export default function AccountPage() {
  const pathname = useRef(window.location.pathname).current
  const [account, setAccount] = useFirestore(
    'accounts',
    pathname.split('users/')[1]
  )
  const editable = useRef(
    loadFromLocalStorage('games').accounts.ids.includes(
      pathname.split('users/')[1]
    )
  ).current

  if (!account)
    return (
      <div className="con pos_full_page list_y">
        <Menu />
        <div className="con mar_ce blur_theme_bg w_max">Account is loading</div>
      </div>
    )

  if (account === ACCOUNT_STATUS.nonAuth) return <AccountPageNonAuth />

  return (
    <>
      <div className="con pos_full_page list_y">
        <Menu />
        <div className="mar_ce d_f_ce list_y account_con">
          <div className="w_100 d_f_ce pos_r">
            <Avatar
              letter={account?.user.name[0]}
              style={{ fontSize: '50px', height: '100px' }}
              editable="true"
            />
            {editable && <AccountPageMenu />}
          </div>
          <AccountPageFollow editable={editable} />
          <AccountPageInfo
            editable={editable}
            account={account}
            setAccount={setAccount}
          />
        </div>
      </div>
    </>
  )
}
