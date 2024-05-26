import { useContext } from 'react'

import { GameAreaContext } from '../../pages/Main/GameArea/GameAreaContext'

import './Menu.css'

export default function Menu({ ...style }) {
  const { GAMES_PAGES, activePage, setActivePage } = useContext(GameAreaContext)

  return (
    <>
      <div className="con_bg_none d_f_ce" {...style}>
        <div className="con_bg_none blur_theme_bg menu_icons list_x">
          <div
            className="con_bg_none blur_ha list_y_small d_f_ce"
            onClick={() => setActivePage(GAMES_PAGES.games)}
          >
            <div
              className={`con_bg_none ${
                activePage === GAMES_PAGES.games ? 'blur_theme_bg active' : ''
              }`}
            >
              <span className="material-symbols-outlined">casino</span>
            </div>
            <div>Games</div>
          </div>
          <div
            className="con_bg_none blur_ha list_y_small d_f_ce"
            onClick={() => setActivePage(GAMES_PAGES.account)}
          >
            <div
              className={`con_bg_none ${
                activePage === GAMES_PAGES.account ? 'blur_theme_bg active' : ''
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
