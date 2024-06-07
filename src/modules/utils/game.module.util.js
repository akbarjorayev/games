import { sendNotification } from '../notifications.module'
import { NOTIFICATIONS_TYPES } from '../../pages/NotificationsPage/data/notificationsData'
import { editFirestore, loadFromFirestore } from '../../js/db/db/firestore'
import { loadFromLocalStorage } from '../../js/db/local/localStorage'
import { gameTokenGenerator } from '../../pages/GamesPage/utils/gameGenerator'
import {
  loadFromRealtimeDB,
  saveToRealtimeDB,
} from '../../js/db/db/firebaseRealtime'
import { GAMES } from '../../pages/GamesPage/data/gameData'

export async function sendPlayReqNotification(friendID, gameLink, gameToken) {
  const userID = loadFromLocalStorage('games').accounts.active
  const account = await loadFromFirestore('accounts', `${userID}`)

  const gameName = GAMES.filter((game) => game.link === gameLink)[0].name

  await sendNotification(friendID, {
    type: NOTIFICATIONS_TYPES.playReqs,
    title: `@${account.user?.name} invited you to play ${gameName}!`,
    description: 'Do you want to play?',
    gameToken,
    gameLink,
  })
}

export async function getGameToken() {
  let hasInDB = true
  let gameToken = ''

  while (hasInDB) {
    const token = gameTokenGenerator()
    const resFromDB = await loadFromRealtimeDB(`games/playing/${token}`)
    hasInDB = resFromDB && resFromDB?.gameToken
    gameToken = token
  }

  return gameToken
}

export async function prepareReltimeDBForGame(friendID, gameToken) {
  const userID = loadFromLocalStorage('games').accounts.active

  await saveToRealtimeDB(`games/playing/${gameToken}`, {
    gameToken,
    gamers: {
      host: userID,
      guest: friendID,
    },
    playing: false,
    denied: false,
  })
}

export async function deleteGuestNotification(gameToken) {
  const realtimeDBData = await loadFromRealtimeDB(`games/playing/${gameToken}`)
  const guest = realtimeDBData.gamers?.guest

  if (!guest) return
  const ns = await loadFromFirestore('notifications', `${guest}`)
  const newNs = ns?.notifications?.filter((n) => n.gameToken !== gameToken)
  await editFirestore('notifications', `${guest}`, { notifications: newNs })
}
