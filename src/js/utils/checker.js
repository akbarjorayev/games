import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from '../db/local/localStorage'

export function checkRunApp() {
  checkInitialLocalStorage()
}

export function checkInitialLocalStorage() {
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
