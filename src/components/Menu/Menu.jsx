import { useContext } from 'react'

import { MainPageContext } from '../../pages/Main/MainPageContext'

import './Menu.css'

export default function Menu({ className }) {
  const { MAIN_PAGES, activePage, setActivePage } = useContext(MainPageContext)

  return (
    <div className={`con_bg_none d_f_ce ${className}`}>
      <div className="con_bg_none blur_theme_bg menu_icons list_x">
        <MenuIcon
          icon="casino"
          label="Games"
          isActive={activePage === MAIN_PAGES.games}
          onClick={() => setActivePage(MAIN_PAGES.games)}
        />
        <MenuIcon
          icon="notifications"
          label="Notifications"
          isActive={activePage === MAIN_PAGES.notifications}
          onClick={() => setActivePage(MAIN_PAGES.notifications)}
        />
        <MenuIcon
          icon="account_circle"
          label="Account"
          isActive={activePage === MAIN_PAGES.accounts}
          onClick={() => setActivePage(MAIN_PAGES.accounts)}
        />
      </div>
    </div>
  )
}

function MenuIcon({ icon, label, isActive, onClick }) {
  return (
    <div
      className="con_bg_none blur_ha list_y_small d_f_ce scale_trns"
      onClick={onClick}
    >
      <div className={`con_bg_none ${isActive ? 'blur_theme_bg active' : ''}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>{label}</div>
    </div>
  )
}
