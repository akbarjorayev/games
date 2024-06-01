import { editFirestore, incrementField } from '../js/db/db/firestore'
import { loadFromLocalStorage } from '../js/db/local/localStorage'

const lId = loadFromLocalStorage('games').accounts.active

export async function removeNotification(id, ns) {
  const newNs = ns.notifications.filter((n) => n.id !== id)

  await editFirestore('notifications', `${lId}`, {
    notifications: newNs,
  })
  await incrementField('notifications', `${lId}`, 'amount', -1)

  return newNs
}
