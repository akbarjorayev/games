import { useState } from 'react'

import Alert from '../../../../components/Alert/Alert'

import { logoutFromAccount } from '../../../../modules/account.module'

export default function AccountPageMenu() {
  const [opened, setOpened] = useState(false)

  function logout() {
    logoutFromAccount()
    window.location.reload()
  }

  return (
    <>
      <div className="acc_page_menu list_y_small d_f_ai_fe">
        <div
          className="con blur_theme_bg blur_ha bd_50 w_max scale_trns cur_pointer d_f_ce"
          onClick={() => setOpened(true)}
        >
          <span className="material-symbols-outlined fz_small_icon">menu</span>
        </div>
      </div>
      {opened && (
        <Alert onHide={() => setOpened(false)}>
          <div className="d_f_ce_child">
            <div
              className="con blur_theme_bg blur_ha txt_red scale_trns cur_pointer"
              onClick={logout}
            >
              Log out
            </div>
          </div>
        </Alert>
      )}
    </>
  )
}
