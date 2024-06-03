import {
  addToArrayFirestore,
  editFirestore,
  incrementField,
  loadFromFirestore,
} from '../js/db/db/firestore'
import { loadFromLocalStorage } from '../js/db/local/localStorage'

const lId = loadFromLocalStorage('games').accounts.active

export async function removeNotification(id) {
  const ns = await loadFromFirestore('notifications', `${lId}`)
  const newNs = ns.notifications.filter((n) => n.id !== id)

  await editFirestore('notifications', `${lId}`, { notifications: newNs })
  await incrementField('notifications', `${lId}`, 'amount', -1)

  return newNs
}

export async function sendNotification(id, ns) {
  const { amount } = await loadFromFirestore('notifications', `${id}`)

  const notification = {
    ...ns,
    new: true,
    id: amount + 1,
    date: new Date().getTime(),
  }

  await addToArrayFirestore(
    'notifications',
    `${id}`,
    'notifications',
    notification
  )
  await incrementField('notifications', `${id}`, 'amount', 1)
}
