import {
  deleteFromRealtimeDB,
  editToRealtimeDB,
} from '../js/db/db/firebaseRealtime'
import { loadFromLocalStorage } from '../js/db/local/localStorage'
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
  deleteFromSession('gameID')

  saveToSession('gameToken', gameToken)
  saveToSession('gameLink', gameLink)
  saveToSession('gameID', loadFromLocalStorage('games').accounts.active)

  await sendPlayReqNotification(friendID, gameLink, gameToken)
  await prepareReltimeDBForGame(friendID, gameToken, gameLink)
}

export async function rejectGame(gameToken) {
  deleteFromSession('gameToken')
  deleteFromSession('gameLink')
  deleteFromSession('gameID')

  await deleteGuestNotification(gameToken)
  await deleteFromRealtimeDB(`games/playing/${gameToken}`)
}

export async function acceptGame(gameToken) {
  deleteFromSession('gameToken')
  deleteFromSession('gameID')

  saveToSession('gameToken', gameToken)
  saveToSession('gameID', loadFromLocalStorage('games').accounts.active)

  await deleteGuestNotification(gameToken)
  await editToRealtimeDB(`games/playing/${gameToken}`, { playing: true })
}

export async function endGame(gameToken) {
  gameToken = gameToken || loadFromSession('gameToken')
  deleteFromSession('gameToken')
  deleteFromSession('gameLink')
  deleteFromSession('gameID')

  await deleteFromRealtimeDB(`games/playing/${gameToken}`)
  goToHref('/')
}
