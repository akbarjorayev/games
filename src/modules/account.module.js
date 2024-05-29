import {
  saveFirestore,
  editFirestore,
  loadFromFirestore,
  deleteFromFirestore,
} from '../js/db/db/firestore'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../js/db/local/localStorage'
import {
  checkIsAccountFree,
  checkLogginAccount,
  logoutFromAccountById,
  saveAccountToFirestore,
  saveAccountToLocalStorage,
  saveLoggedAccountToLocalStorage,
} from './utils/account.module.util'

export async function getAccountAbout() {
  return loadFromFirestore('accounts', '_aboutAccounts')
}

export async function createAccount(data) {
  const { username, phoneNumber } = data

  const isAccountFree = await checkIsAccountFree(username, phoneNumber)
  if (!isAccountFree.ok) return isAccountFree

  const id = (await getAccountAbout()).amount + 1
  const saved = await saveFirestore(
    'accounts',
    `${id}`,
    getAccountDataToSave(id, data)
  )

  if (saved) {
    await saveAccountToFirestore(data, id)
    saveAccountToLocalStorage(id)

    return { ok: true, message: 'Account created' }
  }

  return { ok: false, message: 'Something went wrong' }
}

export async function loginAccount(phoneOrUsername, password, type) {
  const checked = await checkLogginAccount(phoneOrUsername, password, type)
  if (!checked.ok) return checked

  if (checked.ok) {
    const loggedIn = saveLoggedAccountToLocalStorage(checked.account.id)
    return loggedIn
  }
}

function getAccountDataToSave(id, data) {
  const accountData = {
    id,
    user: {
      ...data,
    },
  }

  return accountData
}

export async function editAccountUsername(id, newUsername) {
  const account = await loadFromFirestore('accounts', id)
  const oldUsername = account.user.username
  const usernameIsTaken = await loadFromFirestore('usernames', newUsername)

  if (usernameIsTaken) return { ok: false, message: 'Username is taken' }
  const usernameData = await loadFromFirestore('usernames', oldUsername)

  await saveFirestore('usernames', newUsername, usernameData)
  await editFirestore('accounts', id, { user: { username: newUsername } })
  await deleteFromFirestore('usernames', oldUsername)

  return { ok: true, message: 'Username changed' }
}

export function switchAccountToId(id) {
  const localData = loadFromLocalStorage('games')
  localData.accounts.active = `${id}`
  saveToLocalStorage('games', localData)
}

export function logoutFromAccount(id) {
  const localData = loadFromLocalStorage('games')
  const newLocalData = logoutFromAccountById(id || localData.accounts.active)

  saveToLocalStorage('games', newLocalData)
}
