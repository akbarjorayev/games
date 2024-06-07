import { API } from '../../api/api'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(API.firebase)
export const firestoreDB = getFirestore(app)
export const firebaseRealtimeDB = getDatabase()
export const auth = getAuth(app)
auth.languageCode = auth.useDeviceLanguage()
