import { useRef } from 'react'

import { goToHref } from '../../js/utils/href'

import './Menu.css'

const MENU_PATHNAMES = {
  search: '/search',
  notifications: '/notifications',
  games: '/games',
  account: '/account',
}

export default function Menu() {
  const pathname = useRef(window.location.pathname).current

  return (
    <div className="d_f_ce">
      <div className="con blur_theme_bg menu_icons list_x">
        <MenuIcon
          icon="casino"
          label="Games"
          isActive={pathname === MENU_PATHNAMES.games}
          onClick={() => goToHref(MENU_PATHNAMES.games)}
        />
        <MenuIcon
          icon="search"
          label="Search"
          isActive={pathname === MENU_PATHNAMES.search}
          onClick={() => goToHref(MENU_PATHNAMES.search)}
        />
        <MenuIcon
          icon="notifications"
          label="Notifications"
          isActive={pathname === MENU_PATHNAMES.notifications}
          onClick={() => goToHref(MENU_PATHNAMES.notifications)}
        />
        <MenuIcon
          icon="account_circle"
          label="Account"
          isActive={pathname === MENU_PATHNAMES.account}
          onClick={() => goToHref(MENU_PATHNAMES.account)}
        />
      </div>
    </div>
  )
}

function MenuIcon({ icon, label, isActive, onClick }) {
  return (
    <div
      className="con blur_ha list_y_small d_f_ce scale_trns"
      onClick={onClick}
    >
      <div className={`con ${isActive ? 'blur_theme_bg active' : ''}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>{label}</div>
    </div>
  )
}
