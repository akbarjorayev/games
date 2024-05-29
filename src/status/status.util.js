import { loadFromLocalStorage } from '../js/db/local/localStorage'

const maxAccountLimit = 3

export function getAccountIsAtLimit() {
  const accounts = loadFromLocalStorage('games')?.accounts.ids
  return accounts.length >= maxAccountLimit
}
