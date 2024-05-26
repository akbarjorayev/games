import { useState } from 'react'

import Menu from '../../../components/Menu/Menu'
import GameList from './components/GameList/GameList'

import { GameAreaContext } from './GameAreaContext'

import './GameArea.css'

const GAMES_PAGES = {
  games: 'games',
  account: 'account',
}

export default function GameArea() {
  const [activePage, setActivePage] = useState(GAMES_PAGES.games)
  const gameAreaComponent = {
    [GAMES_PAGES.games]: <GameList />,
    [GAMES_PAGES.account]: 'Account',
  }

  return (
    <>
      <GameAreaContext.Provider
        value={{ GAMES_PAGES, activePage, setActivePage }}
      >
        <div
          className={`pos_full_page list_y h_100 ${
            activePage === GAMES_PAGES.games ? 'game_area_bg_anim' : ''
          }`}
        >
          <div className="game_list d_f_1">{gameAreaComponent[activePage]}</div>
          <Menu style={{ visibility: 'hidden' }} />
          <div className="game_area_menu">
            <Menu />
          </div>
        </div>
      </GameAreaContext.Provider>
    </>
  )
}
