import {
  incrementField,
  loadFromFirestore,
  saveFirestore,
} from '../js/db/db/firestore'
import { saveToLocalStorage } from '../js/db/local/localStorage'

export async function getAccountAbout() {
  return loadFromFirestore('accounts', '_aboutAccounts')
}

export async function createAccount(data) {
  const checked = await checkAccount(data)
  if (!checked.ok) return checked

  const id = (await getAccountAbout()).amount + 1
  const saved = await saveFirestore('accounts', `${id}`, {
    ...data,
    id,
  })

  if (saved) {
    await incrementField('accounts', '_aboutAccounts', 'amount', 1)
    await saveFirestore('usernames', data.username, {
      password: data.password,
      id,
    })
    await saveFirestore('phoneNumbers', data.phoneNumber, {
      password: data.password,
      id,
    })

    saveToLocalStorage('id', id)

    return { ok: true, message: 'Account created' }
  } else {
    return { ok: false, message: 'Something went wrong' }
  }
}

async function checkAccount(data) {
  const { username, phoneNumber } = data

  const usernameIsTaken = await loadFromFirestore('usernames', username)
  if (usernameIsTaken) {
    return {
      ok: false,
      message: 'Account with this username is already exists',
    }
  }
  const phoneNumberIsTaken = await loadFromFirestore(
    'phoneNumbers',
    phoneNumber
  )
  if (phoneNumberIsTaken) {
    return {
      ok: false,
      message: 'Account with this phone number is already exists',
    }
  }

  return { ok: true }
}

export async function loginAccount(phoneOrUsername, password, type) {
  const account = await loadFromFirestore(`${type}s`, phoneOrUsername)
  if (!account) return { ok: false, message: 'Account not found' }
  if (account.password !== password)
    return { ok: false, message: 'Wrong password' }

  if (account.password === password) {
    const { id } = account

    saveToLocalStorage('id', id)
    return { ok: true, message: 'Logged in' }
  }

  return { ok: false, message: 'Something went wrong' }
}
