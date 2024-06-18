import { useRef } from 'react'

import { rpsMove } from '../modules/rockPaperScissors.module'
import { useFirebaseRealtime } from '../../../../hooks/useFirebaseRealtime'
import { loadFromSession } from '../../../../js/db/local/sessionStorage'
import { loadFromLocalStorage } from '../../../../js/db/local/localStorage'

export default function RPSCardMine({ move: rpsCardMove }) {
  const gameToken = useRef(loadFromSession('gameToken')).current
  const localID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [moved] = useFirebaseRealtime(
    `games/playing/${gameToken}/moves/${localID}`
  )

  async function makeMove() {
    await rpsMove(rpsCardMove)
  }

  return (
    <>
      <button
        className="rps_card d_f_ce con_ha"
        onClick={makeMove}
        disabled={moved}
      >
        {rpsCardMove}
      </button>
    </>
  )
}
