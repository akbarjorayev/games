import {
  incrementField,
  loadFromFirestore,
  saveFirestore,
} from '../js/db/db/firestore'

export async function getAccountAbout() {
  return loadFromFirestore('accounts', '_aboutAccounts')
}

export async function createAccount(username, data) {
  const usernameIsTaken = await loadFromFirestore('usernames', username)
  if (usernameIsTaken) {
    return { ok: false, message: 'Account already exists' }
  }

  const id = (await getAccountAbout()).amount + 1
  const saved = await saveFirestore('accounts', username, {
    ...data,
    id,
  })

  if (saved) {
    await incrementField('accounts', '_aboutAccounts', 'amount', 1)
    await saveFirestore('usernames', username, { id })

    return { ok: true, message: 'Account created' }
  } else {
    return { ok: false, message: 'Something went wrong' }
  }
}
