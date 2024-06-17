import { useEffect, useRef, useState } from 'react'

import GameOver from '../../components/GameOver'
import RPSCard from './components/RPSCard'
import RPSCardMine from './components/RPSCardMine'
import RPSGetAccount from './components/RPSGetAccount'
import Button from '../../../components/Button/Button'

import { loadFromSession } from '../../../js/db/local/sessionStorage'
import { useFirebaseRealtime } from '../../../hooks/useFirebaseRealtime'
import { useFirestoreAll } from '../../../hooks/useFirestore'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'
import { RockPaperScissorsContext } from './RockPaperScissorsContext'
import { checkWinner, rpsReplay } from './modules/rockPaperScissors.module'
import { endGame } from '../../../modules/game.module'

import './RockPaperScissors.css'

export default function RockPaperScissors() {
  const gameToken = useRef(loadFromSession('gameToken')).current
  const localID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [gameData] = useFirebaseRealtime(`games/playing/${gameToken}`)
  const [gamers] = useFirestoreAll('accounts', [
    `${gameData?.gamers?.guest}`,
    `${gameData?.gamers?.host}`,
  ])
  const [moves] = useFirebaseRealtime(`games/playing/${gameToken}/moves`)
  const [won] = useFirebaseRealtime(`games/playing/${gameToken}/won`)
  const [move, setMove] = useState('')
  const [showGameOver, setShowGameOver] = useState(false)

  useEffect(() => {
    if (!gameData) {
      const timer = setTimeout(() => setShowGameOver(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [gameData])
  if (showGameOver) return <GameOver />

  if (!gamers || gamers.length < 2) return 'gamers are loading'
  if (gamers.filter((gamer) => gamer).length < 2)
    return 'real gamers are loading'

  const rivalAcc = gamers.filter((gamer) => `${gamer.id}` !== `${localID}`)[0]
  const localAcc = gamers.filter((gamer) => `${gamer.id}` === `${localID}`)[0]

  if (moves && Object.values(moves)?.length === 2) {
    checkWinner(Object.values(moves), Object.keys(moves))
  }

  return (
    <>
      <RockPaperScissorsContext.Provider value={{ move, setMove }}>
        <div className="h_100 list_y d_f_jc_sa">
          <EndGameButton />
          <div className="list_x w_100 d_f_ce">
            <div className="list_y w_100 d_f_ce">
              <RPSGetAccount account={rivalAcc} />
              <RPSCard name={rivalAcc?.user.name} id={rivalAcc?.id} />
            </div>
            <div className="w_100 d_f_ce">
              {won && <ReplayButton />}
              {!won && <div className="rps_txt_vs">VS</div>}
            </div>
            <div className="list_y w_100 d_f_ce">
              <RPSGetAccount account={localAcc} name="You" />
              <RPSCard name="You" id={localAcc?.id} />
            </div>
          </div>
          <div className="list_x w_100 d_f_ce">
            <RPSCardMine move="🪨" />
            <RPSCardMine move="📄" />
            <RPSCardMine move="✂️" />
          </div>
        </div>
      </RockPaperScissorsContext.Provider>
    </>
  )
}

function EndGameButton() {
  return (
    <Button
      className="end_game_btn w_max d_f_ce pd_normal bd_50 txt_red"
      onClick={() => endGame()}
    >
      <span className="material-symbols-outlined">arrow_back</span>
    </Button>
  )
}

function ReplayButton() {
  return (
    <div
      className="rps_card con_ha d_f_ce list_y_small txt_cl"
      onClick={() => rpsReplay()}
    >
      <span className="material-symbols-outlined fz_small_icon">
        play_circle
      </span>
      <div className="txt_ce rps_txt_replay">Replay</div>
    </div>
  )
}
