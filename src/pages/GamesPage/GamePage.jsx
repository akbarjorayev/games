import { useState } from 'react'

import Menu from '../../components/Menu/Menu'
import GamePageFriendsAlert from './components/GamePageFriendsAlert'
import GamePageWaitingForRes from './components/GamePageWaitingForRes'
import GetGameCon from './components/GamePageCon'

import { GAMES } from './data/gameData'

import './GamePage.css'

export default function GamePage() {
  const [friendsAlert, setFriendsAlert] = useState({ link: '', show: false })
  const [waitingForRes, setWaitingForRes] = useState({ name: '' })

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
          setWaitingForRes={setWaitingForRes}
        />
      )}
      {waitingForRes.name && (
        <GamePageWaitingForRes
          name={waitingForRes.name}
          link={friendsAlert.link}
          onHide={() => setWaitingForRes({ name: '' })}
        />
      )}
    </>
  )
}
