export function getPhoneNumber(phoneNumber) {
  phoneNumber = phoneNumber.replace('+998', '').replace(/[^0-9]/g, '')

  const sections = [2, 6, 9]
  const separators = [' ', '-', '-']

  let i = 0
  for (const length of sections) {
    if (phoneNumber.length > length) {
      phoneNumber =
        phoneNumber.substring(0, length) +
        separators[i] +
        phoneNumber.substring(length)
      i++
    }
  }

  return `+998 ${phoneNumber.substring(0, 12)}`
}

export function isValidUzbekMobileNumber(number) {
  number = getCorrectPhoneNumber(number)
  const validOperators = [
    '93', // Ucell
    '94', // Ucell
    '50', // Ucell
    '90', // Beeline
    '91', // Beeline
    '88', // UMS (Universal Mobile Systems)
    '95', // Uzmobile
    '77', // Uzmobile
    '99', // Uzmobile
    '97', // Mobiuz
    '98', // Perfectum Mobile
  ]

  if (!/^\d{9}$/.test(number)) return false

  const operatorCode = number.substring(0, 2)
  return validOperators.includes(operatorCode)
}

export function getCorrectPhoneNumber(number, countryCode) {
  number = number.replace('+998', '').replaceAll('-', '').replaceAll(' ', '')

  return countryCode ? `+998${number}` : number
}
