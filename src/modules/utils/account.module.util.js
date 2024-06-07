import {
  incrementField,
  loadFromFirestore,
  saveFirestore,
} from '../../js/db/db/firestore'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../../js/db/local/localStorage'

export async function checkIsAccountFree(username, phoneNumber) {
  const [usernameIsTaken, phoneNumberIsTaken] = await Promise.all([
    loadFromFirestore('usernames', username),
    loadFromFirestore('phoneNumbers', phoneNumber),
  ])

  if (usernameIsTaken) {
    return { ok: false, message: 'Account with this username already exists' }
  }

  if (phoneNumberIsTaken) {
    return {
      ok: false,
      message: 'Account with this phone number already exists',
    }
  }

  return { ok: true }
}

export async function saveAccountToFirestore(data, id) {
  const { username, phoneNumber, password } = data
  const dataToSave = {
    password: password,
    id,
  }

  await incrementField('accounts', '_aboutAccounts', 'amount', 1)
  await saveFirestore('usernames', username, dataToSave)
  await saveFirestore('phoneNumbers', phoneNumber, dataToSave)
}

export function saveAccountToLocalStorage(id) {
  const localData = loadFromLocalStorage('games')
  localData.accounts.active = `${id}`
  localData.accounts.ids.push(`${id}`)

  saveToLocalStorage('games', localData)
}

export function saveLoggedAccountToLocalStorage(id) {
  const localData = loadFromLocalStorage('games')

  if (localData.accounts.ids.includes(`${id}`))
    return { ok: false, message: 'You are already logged in' }

  if (!localData.accounts.active) localData.accounts.active = `${id}`
  localData.accounts.ids.push(`${id}`)

  saveToLocalStorage('games', localData)
  return { ok: true, message: 'Logged in' }
}

export async function checkLogginAccount(phoneOrUsername, password, type) {
  const account = await loadFromFirestore(`${type}s`, phoneOrUsername)
  if (!account) return { ok: false, message: 'Account not found' }
  if (account.password !== password)
    return { ok: false, message: 'Wrong password' }

  return { ok: true, account }
}

export function logoutFromAccountById(id) {
  const localData = loadFromLocalStorage('games')

  localData.accounts.ids = localData.accounts.ids.filter(
    (lId) => `${lId}` !== `${id}`
  )
  if (`${localData.accounts.active}` === `${id}`) {
    localData.accounts.active =
      localData.accounts.ids.length > 0 ? `${localData.accounts.ids[0]}` : ''
  }

  return localData
}
