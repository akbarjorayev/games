import { useRef, useState } from 'react'

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
        <div className="h_100 list_y d_f_ce">
          <RPSGetAccount account={rivalAcc} />
          <div className="list_x w_100 d_f_ce">
            <RPSCard name={rivalAcc?.user.name} id={rivalAcc?.id} />
            <div className="fz_medium">VS</div>
            <RPSCard name="You" id={localAcc?.id} />
          </div>
          <RPSGetAccount account={localAcc} name="You" />
          {won && (
            <Button className="btn_bd txt_cl" onClick={() => rpsReplay()}>
              Replay
            </Button>
          )}
          {!won && (
            <div className="list_x w_100 d_f_ce">
              <RPSCardMine move="🪨" />
              <RPSCardMine move="📄" />
              <RPSCardMine move="✂️" />
            </div>
          )}
        </div>
      </RockPaperScissorsContext.Provider>
    </>
  )
}
