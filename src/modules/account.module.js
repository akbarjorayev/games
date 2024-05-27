import { loadFromFirestore, saveFirestore } from '../js/db/db/firestore'
import {
  checkIsAccountFree,
  checkLogginAccount,
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
