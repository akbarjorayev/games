import {
  deleteFromRealtimeDB,
  editToRealtimeDB,
} from '../js/db/db/firebaseRealtime'
import {
  deleteFromSession,
  loadFromSession,
  saveToSession,
} from '../js/db/local/sessionStorage'
import { goToHref } from '../js/utils/href'
import {
  deleteGuestNotification,
  getGameToken,
  prepareReltimeDBForGame,
  sendPlayReqNotification,
} from './utils/game.module.util'

export async function prepareGame(friendID, gameLink) {
  const gameToken = await getGameToken()
  deleteFromSession('gameToken')
  deleteFromSession('gameLink')

  saveToSession('gameToken', gameToken)
  saveToSession('gameLink', gameLink)

  await sendPlayReqNotification(friendID, gameLink, gameToken)
  await prepareReltimeDBForGame(friendID, gameToken)
}

export async function rejectGame(gameToken) {
  deleteFromSession('gameToken')
  deleteFromSession('gameLink')

  await deleteGuestNotification(gameToken)
  await deleteFromRealtimeDB(`games/playing/${gameToken}`)
}

export async function acceptGame(gameToken) {
  deleteFromSession('gameToken')
  saveToSession('gameToken', gameToken)

  await deleteGuestNotification(gameToken)
  await editToRealtimeDB(`games/playing/${gameToken}`, { playing: true })
}

export async function endGame(gameToken) {
  gameToken = gameToken || loadFromSession('gameToken')
  deleteFromSession('gameToken')
  deleteFromSession('gameLink')

  await deleteFromRealtimeDB(`games/playing/${gameToken}`)
  goToHref('/')
}
