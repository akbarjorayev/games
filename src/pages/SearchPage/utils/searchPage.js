import { loadFromFirestoreWhere } from '../../../js/db/db/firestore'

const VALUE_TYPES = {
  username: 'username',
}

export async function searchForAccounts(value) {
  value = value.trim()
  const valueType = getValueType(value)
  const accData = await getAccount(valueType, value)

  return accData
}

function getValueType(value) {
  if (/^[0-9]+$/.test(value)) return VALUE_TYPES.account
  return VALUE_TYPES.username
}

async function getAccount(type, value) {
  const data = await loadFromFirestoreWhere('accounts', [
    `user.${type}`,
    '==',
    value,
  ])
  return data
}
