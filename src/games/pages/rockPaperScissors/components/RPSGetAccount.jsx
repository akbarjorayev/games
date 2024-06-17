import { useRef } from 'react'

import Avatar from '../../../../components/Avatar/Avatar'

import { useFirebaseRealtime } from '../../../../hooks/useFirebaseRealtime'
import { loadFromSession } from '../../../../js/db/local/sessionStorage'

export default function RPSGetAccount({ account, name }) {
  const gameToken = useRef(loadFromSession('gameToken')).current
  const [won] = useFirebaseRealtime(`games/playing/${gameToken}/won`)

  return (
    <>
      <div
        className="rps_account list_y_small d_f_ai_ce"
        won={`${won && +won === +account?.id}`}
        loser={`${won && +won !== +account?.id}`}
      >
        <Avatar id={account?.id} style={{ height: 80 }} />
        <b>{name || account?.user.name}</b>
      </div>
    </>
  )
}
