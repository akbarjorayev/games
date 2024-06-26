import { useRef } from 'react'

import Avatar from '../Avatar/Avatar'

import { goToHref } from '../../js/utils/href'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'

import './Menu.css'

const MENU_PATHNAMES = {
  search: '/search',
  notifications: '/notifications',
  games: '/games',
  user: '/users',
}

export default function Menu() {
  const id = useRef(loadFromLocalStorage('games').accounts.active).current
  const pathname = useRef(window.location.pathname).current
  const ids = useRef(loadFromLocalStorage('games').accounts.ids).current
  const pathnameID = useRef(pathname.split('users/')[1]).current

  return (
    <div className="d_f_ce">
      <div className="con blur_theme_bg menu_icons list_x">
        <MenuIcon
          icon="casino"
          isActive={pathname === MENU_PATHNAMES.games}
          onClick={() => goToHref(MENU_PATHNAMES.games)}
        />
        <MenuIcon
          icon="search"
          isActive={pathname === MENU_PATHNAMES.search}
          onClick={() => goToHref(MENU_PATHNAMES.search)}
        />
        <MenuIcon
          icon="notifications"
          isActive={pathname === MENU_PATHNAMES.notifications}
          onClick={() => goToHref(MENU_PATHNAMES.notifications)}
        />
        <AccountMenuIcon
          icon="account_circle"
          isActive={ids.includes(pathnameID)}
          onClick={() => goToHref(`/users/${id}`)}
        />
      </div>
    </div>
  )
}

function MenuIcon({ icon, isActive, onClick }) {
  return (
    <button
      className="con blur_ha list_y_small d_f_ce scale_trns"
      onClick={() => {
        if (!isActive) onClick()
      }}
      tabIndex={isActive ? '-1' : '0'}
    >
      <div className={`con ${isActive ? 'blur_theme_bg active' : ''}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </button>
  )
}

function AccountMenuIcon({ isActive, onClick }) {
  return (
    <>
      <button
        className="blur_ha list_y_small d_f_ce scale_trns"
        onClick={() => {
          if (!isActive) onClick()
        }}
        tabIndex={isActive ? '-1' : '0'}
      >
        <div className={`con ${isActive ? 'blur_theme_bg active' : ''}`}>
          <Avatar
            style={{
              height: '30px',
              fontSize: '16px',
              color: 'var(--theme-color-not)',
            }}
          ></Avatar>
        </div>
      </button>
    </>
  )
}
