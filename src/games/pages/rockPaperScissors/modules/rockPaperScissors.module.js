import { saveOrEditToRealtimeDB } from '../../../../js/db/db/firebaseRealtime'
import { loadFromLocalStorage } from '../../../../js/db/local/localStorage'
import { loadFromSession } from '../../../../js/db/local/sessionStorage'
import { findWinner } from './utils/rockPaperScissors.module.util'

export async function rpsMove(move) {
  const gameToken = loadFromSession('gameToken')
  const id = loadFromLocalStorage('games').accounts.active

  await saveOrEditToRealtimeDB(`games/playing/${gameToken}/moves/${id}`, move)
}

export async function checkWinner(movers, ids) {
  const gameToken = loadFromSession('gameToken')
  const won = findWinner(movers, ids)

  await saveOrEditToRealtimeDB(`games/playing/${gameToken}/won`, +won)
}
