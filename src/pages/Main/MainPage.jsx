import { useState } from 'react'

import Menu from '../../components/Menu/Menu'
import GameList from './GamesPage/GameList'
import AccountPage from './AccountPage/AccountPage'
import NotificationsPage from './NotificationsPage/NotificationsPage'

import { MainPageContext } from './MainPageContext'

import './MainPage.css'

const MAIN_PAGES = {
  games: 'games',
  accounts: 'accounts',
  notifications: 'notifications',
}

export default function MainPage() {
  const [activePage, setActivePage] = useState(MAIN_PAGES.notifications)
  const gameAreaComponent = {
    [MAIN_PAGES.games]: <GameList />,
    [MAIN_PAGES.accounts]: <AccountPage />,
    [MAIN_PAGES.notifications]: <NotificationsPage />,
  }

  return (
    <>
      <MainPageContext.Provider
        value={{ MAIN_PAGES, activePage, setActivePage }}
      >
        <div
          className={`pos_full_page list_y h_100 ${
            activePage === MAIN_PAGES.games ? 'game_area_bg_anim' : ''
          }`}
        >
          <div className="game_list d_f_1">{gameAreaComponent[activePage]}</div>
          <Menu className="v_hidden" />
          <div className="main_page_menu">
            <Menu />
          </div>
        </div>
      </MainPageContext.Provider>
    </>
  )
}
