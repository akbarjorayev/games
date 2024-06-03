import { loadFromFirestore } from '../../../js/db/db/firestore'

const VALUE_TYPES = {
  account: 'account',
  username: 'username',
}

export async function searchForAccounts(value) {
  value = value.trim()
  const valueType = getValueType(value)
  const accData = await getAccount(valueType, value)

  return valueType === VALUE_TYPES.account
    ? accData
    : await getAccount(VALUE_TYPES.account, accData?.id)
}

function getValueType(value) {
  if (/^[0-9]+$/.test(value)) return VALUE_TYPES.account
  return VALUE_TYPES.username
}

async function getAccount(type, id) {
  const data = await loadFromFirestore(`${type}s`, `${id}`)
  return data
}
