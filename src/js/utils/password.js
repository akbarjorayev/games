export function generateStrongPassword(length = 6) {
  const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?'

  const allCharacters =
    upperCaseLetters + lowerCaseLetters + numbers + specialCharacters

  let password = ''
  for (let i = 0; i < length; i++) {
    password += getRandomChar(allCharacters)
  }

  return password
}

function getRandomChar(string) {
  return string.charAt(Math.floor(Math.random() * string.length))
}
