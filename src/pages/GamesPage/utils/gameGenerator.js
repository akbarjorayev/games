export function gameTokenGenerator() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 16; i++) {
    const rI = Math.floor(Math.random() * characters.length)
    token += characters[rI]
  }
  return `gameToken_${token}`
}
