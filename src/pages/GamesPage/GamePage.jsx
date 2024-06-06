import { useState } from 'react'

import Menu from '../../components/Menu/Menu'
import GamePageFriendsAlert from './components/GamePageFriendsAlert'

import { GAMES } from './data/gameData'

import './GamePage.css'

export default function GamePage() {
  const [friendsAlert, setFriendsAlert] = useState({ link: '', show: false })

  return (
    <>
      <div className="con pos_full_page list_y game_page game_area_bg_anim">
        <div className="game_page_menu">
          <Menu />
        </div>
        <div className="pd_small d_f_1">
          {
            <div className="d_f_gap d_f_jc_ce" style={{ '--d-f-gap': '10px' }}>
              {GAMES.map((game, i) => (
                <GetGameCon
                  key={i}
                  game={game}
                  setFriendsAlert={setFriendsAlert}
                />
              ))}
            </div>
          }
        </div>
      </div>
      {friendsAlert.show && (
        <GamePageFriendsAlert
          link={friendsAlert.link}
          onHide={() => setFriendsAlert({ ...friendsAlert, show: false })}
        />
      )}
    </>
  )
}

function GetGameCon({ game, setFriendsAlert }) {
  function gettingStart() {
    setFriendsAlert((prev) => ({ ...prev, show: true, link: game.link }))
  }

  return (
    <div
      className="game d_f_fd_c blur_theme_bg blur_ha scale_trns"
      tabIndex="0"
      onClick={gettingStart}
      onKeyDown={(e) => {
        if (e.key === 'Enter') gettingStart()
      }}
    >
      <div className="game_icon d_f_1">
        <div className="img d_f_ce">
          <img src={game.icon} alt={game.name} />
        </div>
      </div>
      <b className="con blur_theme_bg bd_none d_f_ce game_name fz_medium">
        {game.name}
      </b>
    </div>
  )
}
