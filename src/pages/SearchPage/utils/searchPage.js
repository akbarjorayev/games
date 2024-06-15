import { loadFromFirestoreWhere } from '../../../js/db/db/firestore'

const PATHS = {
  id: 'id',
  username: 'user.username',
}

export async function searchForAccounts(value) {
  value = value.trim()
  const path = getPath(value)
  const accData = await getAccount(path, value)

  return accData
}

function getPath(value) {
  if (/^[0-9]+$/.test(value)) return PATHS.id
  return PATHS.username
}

async function getAccount(path, value) {
  const data = await loadFromFirestoreWhere('accounts', [
    path,
    '==',
    path === PATHS.id ? +value : value,
  ])
  return data
}
