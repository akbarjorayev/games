import { useEffect } from 'react'

import Alert from '../../../components/Alert/Alert'
import Button from '../../../components/Button/Button'

import {
  deleteFromSession,
  loadFromSession,
} from '../../../js/db/local/sessionStorage'
import { endGame } from '../../../modules/game.module'
import { goToHref } from '../../../js/utils/href'
import { useFirebaseRealtime } from '../../../hooks/useFirebaseRealtime'
import { useCounter } from '../../../hooks/useCounter'

export default function GamePageWaitingForRes({ name, link, onHide }) {
  const [count] = useCounter()
  const gameToken = loadFromSession('gameToken')
  const [isPlaying] = useFirebaseRealtime(`games/playing/${gameToken}/playing`)
  const [isDenied] = useFirebaseRealtime(`games/playing/${gameToken}/denied`)

  useEffect(() => {
    if (isPlaying) goToHref(link)
  }, [isPlaying])

  async function stopGame() {
    const gameToken = loadFromSession('gameToken')
    deleteFromSession('gameToken')
    deleteFromSession('gameLink')

    await endGame(gameToken)
    onHide()
  }

  if (isDenied === null)
    return (
      <Alert onHide={stopGame}>
        <div className="list_y">
          <div className="txt_ce">
            <b>{name}</b> <span className="txt_red">denied</span> your request
          </div>
        </div>
      </Alert>
    )

  return (
    <Alert onHide={stopGame}>
      <div className="list_y">
        <div className="txt_ce">
          You're waiting for <b>{name}</b> response for {count}{' '}
          {count > 1 ? 'seconds' : 'second'}
        </div>
        <Button className="btn_bd txt_red" onClick={stopGame}>
          Stop waiting
        </Button>
      </div>
    </Alert>
  )
}
