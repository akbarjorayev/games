import { useState } from 'react'

import Alert from '../../../components/Alert/Alert'

import { logoutFromAccount } from '../../../modules/account.module'

export default function AccountPageMenu() {
  const [opened, setOpened] = useState(false)

  function logout() {
    logoutFromAccount()
  }

  return (
    <>
      <div className="acc_page_menu list_y_small d_f_ai_fe">
        <button
          className="con blur_theme_bg blur_ha bd_50 w_max scale_trns cur_pointer d_f_ce"
          onClick={() => setOpened(true)}
        >
          <span className="material-symbols-outlined fz_small_icon">menu</span>
        </button>
      </div>
      {opened && (
        <Alert onHide={() => setOpened(false)}>
          <div className="d_f_ce_child">
            <button
              className="con blur_theme_bg blur_ha txt_red scale_trns cur_pointer w_100"
              onClick={logout}
            >
              Log out
            </button>
          </div>
        </Alert>
      )}
    </>
  )
}
