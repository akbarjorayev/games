import Avatar from '../../../components/Avatar/Avatar'
import AccountPageNonAuth from './components/AccountPageNonAuth'
import AccountPageMenu from './components/AccountPageMenu'
import AccountPageFollow from './components/AccountPageFollow'
import AccountPageInfo from './components/AccountPageInfo'

import { loadFromLocalStorage } from '../../../js/db/local/localStorage'
import { useFirestore } from '../../../hooks/useFirestore'

import './AccountPage.css'

const ACCOUNT_STATUS = {
  nonAuth: 'non-auth',
}

export default function AccountPage() {
  const [account, setAccount] = useFirestore(
    'accounts',
    loadFromLocalStorage('games')?.accounts.active
  )

  if (!account)
    return (
      <div className="pos_full_page d_f_ce">
        <div className="con_bg_none mar_ce blur_theme_bg w_max">
          Account is loading
        </div>
      </div>
    )

  if (account === ACCOUNT_STATUS.nonAuth) return <AccountPageNonAuth />

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
