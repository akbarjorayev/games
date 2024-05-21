import { API } from '../../api/api'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(API.firebase)
export const firedb = getFirestore(app)
export const auth = getAuth(app)
auth.languageCode = auth.useDeviceLanguage()
