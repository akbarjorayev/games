import { useContext, useRef } from 'react'

import { rpsMove } from '../modules/rockPaperScissors.module'
import { useFirebaseRealtime } from '../../../../hooks/useFirebaseRealtime'
import { loadFromSession } from '../../../../js/db/local/sessionStorage'
import { RockPaperScissorsContext } from '../RockPaperScissorsContext'
import { loadFromLocalStorage } from '../../../../js/db/local/localStorage'

export default function RPSCardMine({ move: rpsCardMove }) {
  const { setMove } = useContext(RockPaperScissorsContext)
  const gameToken = useRef(loadFromSession('gameToken')).current
  const localID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [moved] = useFirebaseRealtime(
    `games/playing/${gameToken}/moves/${localID}`
  )

  async function makeMove() {
    setMove(rpsCardMove)
    await rpsMove(rpsCardMove)
  }

  return (
    <>
      <div
        className="rps_card d_f_ce con_ha"
        onClick={makeMove}
        disabled={moved}
      >
        {rpsCardMove}
      </div>
    </>
  )
}
