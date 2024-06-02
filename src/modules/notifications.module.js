import { editFirestore, incrementField } from '../js/db/db/firestore'

const lId = window.location.pathname.split('users/')[1]

export async function removeNotification(id, ns) {
  const newNs = ns.notifications.filter((n) => n.id !== id)

  await editFirestore('notifications', `${lId}`, {
    notifications: newNs,
  })
  await incrementField('notifications', `${lId}`, 'amount', -1)

  return newNs
}
