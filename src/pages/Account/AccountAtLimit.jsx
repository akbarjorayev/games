import { createContext, useContext, useRef, useState } from 'react'

import Avatar from '../../components/Avatar/Avatar'
import Button from '../../components/Button/Button'

import { useFirestoreAll } from '../../hooks/useFirestore'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'
import { goToHref } from '../../js/utils/href'
import { logoutFromAccount } from '../../modules/account.module'
import { maxAccountLimit } from '../../status/status.util'

const accountAtLimitContext = createContext()

export default function AccountAtLimit() {
  const ids = useRef(loadFromLocalStorage('games').accounts.ids)
  const [accounts] = useFirestoreAll('accounts', ids.current)
  const [accountLen, setAccountLen] = useState(maxAccountLimit)

  return (
    <>
      <div className="h_100 d_f_ce">
        <div className="account_con list_y">
          <div className="con blur_theme_bg list_y">
            <div>
              <b className="d_f_ce fz_medium">You have reached your limit</b>
              <div className="line_x"></div>
            </div>
            <accountAtLimitContext.Provider value={{ setAccountLen }}>
              {accounts &&
                accounts.map((account, i) => (
                  <GetAccounts account={account} key={i} />
                ))}
            </accountAtLimitContext.Provider>
          </div>
          {accountLen < accounts?.length && (
            <div className="list_x w_100_child">
              <Button
                className="btn_bd_cl bg_none"
                onClick={() => goToHref('/account/login')}
              >
                Login
              </Button>
              <Button
                className="btn_bd_cl bg_none"
                onClick={() => goToHref('/account/signup/phone')}
              >
                Signup
              </Button>
            </div>
          )}
          <Button className="btn_cl" onClick={() => goToHref('/')}>
            Home page
          </Button>
        </div>
      </div>
    </>
  )
}

function GetAccounts({ account }) {
  const { setAccountLen } = useContext(accountAtLimitContext)
  const [loggedout, setLoggedout] = useState(false)

  function logout() {
    logoutFromAccount(`${account.id}`)
    setLoggedout(true)
    setAccountLen((cur) => cur - 1)
  }

  return (
    <div className="con list_x d_f_jc_sb d_f_ai_ce" disabled={loggedout}>
      <div className="list_x">
        <Avatar letter={account?.user.name[0]} style={{ height: '40px' }} />
        <div className="list_y_small">
          <b>{account?.user.name}</b>
          <div className="fz_small">@{account?.user.username}</div>
        </div>
      </div>
      {!loggedout && (
        <div
          className="con blur_ha bd_50 d_f_ce scale_trns cur_pointer pd_small"
          onClick={logout}
          style={{ width: '40px', height: '40px' }}
        >
          <span className="material-symbols-outlined fz_small_icon txt_red">
            logout
          </span>
        </div>
      )}
    </div>
  )
}
