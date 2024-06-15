import {
  saveFirestore,
  editFirestore,
  loadFromFirestore,
  incrementField,
  loadFromFirestoreWhere,
} from '../js/db/db/firestore'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../js/db/local/localStorage'
import { goToHref } from '../js/utils/href'
import {
  checkIsAccountFree,
  checkLogginAccount,
  logoutFromAccountById,
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
    await incrementField('accounts', '_aboutAccounts', 'amount', 1)
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
  const usernameIsTaken = await loadFromFirestoreWhere('accounts', [
    'user.username',
    '==',
    newUsername,
  ])

  if (usernameIsTaken?.length > 0)
    return { ok: false, message: 'Username is taken' }

  await editFirestore('accounts', id, { user: { username: newUsername } })
  return { ok: true, message: 'Username changed' }
}

export function switchAccountToId(id) {
  const localData = loadFromLocalStorage('games')
  localData.accounts.active = `${id}`
  saveToLocalStorage('games', localData)
}

export function logoutFromAccount(id, reload = true) {
  const localData = loadFromLocalStorage('games')
  const newLocalData = logoutFromAccountById(id || localData.accounts.active)

  saveToLocalStorage('games', newLocalData)

  if (!reload) return
  if (newLocalData.accounts.active)
    goToHref(`/users/${newLocalData.accounts.active}`)
  else goToHref('/')
}
