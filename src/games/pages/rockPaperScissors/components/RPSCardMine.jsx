import { useContext, useRef } from 'react'

import { rpsMove } from '../modules/rockPaperScissors.module'
import { useFirebaseRealtime } from '../../../../hooks/useFirebaseRealtime'
import { loadFromSession } from '../../../../js/db/local/sessionStorage'
import { RockPaperScissorsContext } from '../RockPaperScissorsContext'

export default function RPSCardMine({ move: rpsCardMove }) {
  const { setMove } = useContext(RockPaperScissorsContext)
  const gameToken = useRef(loadFromSession('gameToken')).current
  const [won] = useFirebaseRealtime(`games/playing/${gameToken}/won`)

  async function makeMove() {
    setMove(rpsCardMove)
    await rpsMove(rpsCardMove)
  }

  return (
    <>
      <div className="rps_card d_f_ce con_ha" onClick={makeMove} disabled={won}>
        {rpsCardMove}
      </div>
    </>
  )
}
