import { createContext, useRef } from 'react'

import Avatar from '../../../components/Avatar/Avatar'
import Loading from '../../../components/Loading/Loading'

import { loadFromSession } from '../../../js/db/local/sessionStorage'
import { useFirebaseRealtime } from '../../../hooks/useFirebaseRealtime'
import { useFirestoreAll } from '../../../hooks/useFirestore'
import { loadFromLocalStorage } from '../../../js/db/local/localStorage'

import './RockPaperScissors.css'

const RockPaperScissorsContext = createContext()

export default function RockPaperScissors() {
  const gameToken = useRef(loadFromSession('gameToken')).current
  const localID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [gameData] = useFirebaseRealtime(`games/playing/${gameToken}`)
  const [gamers] = useFirestoreAll('accounts', [
    `${gameData?.gamers?.guest}`,
    `${gameData?.gamers?.host}`,
  ])

  if (!gamers || gamers.length < 2) return 'gamers are loading'
  if (gamers.filter((gamer) => gamer).length < 2)
    return 'real gamers are loading'

  const rivalAcc = gamers.filter((gamer) => `${gamer.id}` !== `${localID}`)[0]
  const localAcc = gamers.filter((gamer) => `${gamer.id}` === `${localID}`)[0]

  return (
    <>
      <RockPaperScissorsContext.Provider value={'a'}>
        <div className="h_100 list_y d_f_ce">
          <GetAccount account={rivalAcc} />
          <div className="list_x w_100 d_f_ce">
            <RPSCard name={rivalAcc?.user.name} />
            <div className="fz_medium">VS</div>
            <RPSCard name="You" />
          </div>
          <GetAccount account={localAcc} name="You" />
          <div className="list_x w_100 d_f_ce">
            <div className="rps_card d_f_ce con_ha">🪨</div>
            <div className="rps_card d_f_ce con_ha">📄</div>
            <div className="rps_card d_f_ce con_ha">✂️</div>
          </div>
        </div>
      </RockPaperScissorsContext.Provider>
    </>
  )
}

function RPSCard({ move, name }) {
  return (
    <>
      <div className="rps_card d_f_ce">
        {!move && <Loading size={40} />}
        {move && <div>{move}</div>}
        <div className="blur_theme_bg w_100 txt_ce rps_card_name">{name}</div>
      </div>
    </>
  )
}

function GetAccount({ account, name }) {
  return (
    <>
      <div className="list_y_small d_f_ai_ce">
        <Avatar id={account?.id} style={{ height: 80 }} />
        <b>{name || account?.user.name}</b>
      </div>
    </>
  )
}
