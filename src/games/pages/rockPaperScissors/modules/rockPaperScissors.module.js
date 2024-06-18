import {
  deleteFromRealtimeDB,
  saveOrEditToRealtimeDB,
  saveToRealtimeDB,
} from '../../../../js/db/db/firebaseRealtime'
import { loadFromSession } from '../../../../js/db/local/sessionStorage'
import { findWinner } from './utils/rockPaperScissors.module.util'

export async function rpsMove(move) {
  const gameToken = loadFromSession('gameToken')
  const gameID = loadFromSession('gameID')

  await saveOrEditToRealtimeDB(
    `games/playing/${gameToken}/moves/${gameID}`,
    move
  )
}

export async function checkWinner(movers, ids) {
  const gameToken = loadFromSession('gameToken')
  const won = findWinner(movers, ids)

  await saveOrEditToRealtimeDB(`games/playing/${gameToken}/won`, won)
}

export async function rpsReplay() {
  const gameToken = loadFromSession('gameToken')

  await deleteFromRealtimeDB(`games/playing/${gameToken}/moves`)
  await deleteFromRealtimeDB(`games/playing/${gameToken}/won`)
  await saveToRealtimeDB(`games/playing/${gameToken}/won`, false)
}
