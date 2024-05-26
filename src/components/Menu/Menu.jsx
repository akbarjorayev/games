import { useContext } from 'react'

import { MainPageContext } from '../../pages/Main/MainPageContext'

import './Menu.css'

export default function Menu({ ...style }) {
  const { MAIN_PAGES, activePage, setActivePage } = useContext(MainPageContext)

  return (
    <>
      <div className="con_bg_none d_f_ce" {...style}>
        <div className="con_bg_none blur_theme_bg menu_icons list_x">
          <div
            className="con_bg_none blur_ha list_y_small d_f_ce"
            onClick={() => setActivePage(MAIN_PAGES.games)}
          >
            <div
              className={`con_bg_none ${
                activePage === MAIN_PAGES.games ? 'blur_theme_bg active' : ''
              }`}
            >
              <span className="material-symbols-outlined">casino</span>
            </div>
            <div>Games</div>
          </div>
          <div
            className="con_bg_none blur_ha list_y_small d_f_ce"
            onClick={() => setActivePage(MAIN_PAGES.accounts)}
          >
            <div
              className={`con_bg_none ${
                activePage === MAIN_PAGES.accounts ? 'blur_theme_bg active' : ''
              }`}
            >
              <span className="material-symbols-outlined">account_circle</span>
            </div>
            <div>Account</div>
          </div>
        </div>
      </div>
    </>
  )
}
