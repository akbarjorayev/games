import { useRef } from 'react'

import Loading from '../../../../components/Loading/Loading'

import { useFirebaseRealtime } from '../../../../hooks/useFirebaseRealtime'
import { loadFromSession } from '../../../../js/db/local/sessionStorage'
import { loadFromLocalStorage } from '../../../../js/db/local/localStorage'

export default function RPSCard({ name, id }) {
  const gameToken = useRef(loadFromSession('gameToken')).current
  const localID = useRef(loadFromLocalStorage('games').accounts.active).current
  const [move] = useFirebaseRealtime(`games/playing/${gameToken}/moves/${id}`)
  const [won] = useFirebaseRealtime(`games/playing/${gameToken}/won`)

  return (
    <>
      <div className="rps_card d_f_ce">
        {!move && <Loading size={40} />}
        {move && `${id}` !== `${localID}` && !won && <div>?</div>}
        {move && `${id}` !== `${localID}` && won && <div>{move}</div>}
        {move && `${id}` === `${localID}` && <div>{move}</div>}
        <div className="blur_theme_bg w_100 txt_ce rps_card_name">{name}</div>
      </div>
    </>
  )
}
