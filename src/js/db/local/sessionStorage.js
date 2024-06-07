export function saveToSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function loadFromSession(key) {
  return JSON.parse(sessionStorage.getItem(key))
}

export function deleteFromSession(key) {
  sessionStorage.removeItem(key)
}
