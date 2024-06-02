import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import { auth } from './firebaseDB'
import { getCorrectPhoneNumber } from '../../../pages/SignupLoginPage/utils/phoneNumber'

export function sendSMS(phoneNumber) {
  return signInWithPhoneNumber(
    auth,
    getCorrectPhoneNumber(phoneNumber, true),
    window.recaptchaVerifier
  )
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult
      return true
    })
    .catch(() => {
      return false
    })
}

export function verifySMS(code) {
  if (!window.confirmationResult) return false

  return window.confirmationResult
    .confirm(code)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

export function verifyRecaptcha(id) {
  if (!window.recaptchaVerifier)
    window.recaptchaVerifier = new RecaptchaVerifier(auth, id, {
      size: 'invisible',
    })
}
