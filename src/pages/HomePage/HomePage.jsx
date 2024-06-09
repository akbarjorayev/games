import { useRef } from 'react'

import logo from '../../imgs/logo/appLogo.webp'

import { goToHref } from '../../js/utils/href'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import './HomePage.css'

export default function HomePage() {
  const hasAccount = useRef(
    loadFromLocalStorage('games')?.accounts.active
  ).current

  function changeHref() {
    if (hasAccount) goToHref('/games')
    if (!hasAccount) goToHref('/account/signup/phone')
  }

  return (
    <>
      <div className="pos_full_page home_page d_f_ce list_y">
        <div className="home_page_logo_con">
          <img src={logo} alt="Logo" />
          <div className="d_f_ce">
            <button
              className="con btn_cl home_page_play_btn fz_medium scale_trns cur_pointer"
              onClick={changeHref}
            >
              {hasAccount && <span>Play</span>}
              {!hasAccount && <span>Create account</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
