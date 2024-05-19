export function saveToSession(key, value) {
  sessionStorage.setItem(key, value)
}

export function loadFromSession(key) {
  return sessionStorage.getItem(key)
}
