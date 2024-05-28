import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../db/local/localStorage'

export function checkRunApp() {
  checkInitialLocalStorage()
}

export function checkInitialLocalStorage() {
  console.log('a')
  if (!loadFromLocalStorage('games')) {
    saveToLocalStorage('games', getInitialLocalStorage())
  }
}

export function getInitialLocalStorage() {
  const data = {
    accounts: {
      active: '',
      ids: [],
    },
  }

  return data
}
