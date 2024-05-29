import { loadFromLocalStorage } from '../js/db/local/localStorage'

export const maxAccountLimit = 3

export function getAccountIsAtLimit() {
  const accounts = loadFromLocalStorage('games')?.accounts.ids
  return accounts.length >= maxAccountLimit
}
