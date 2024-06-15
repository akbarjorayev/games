import { API } from '../../api/api'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const app = initializeApp(API.firebase)
export const firestoreDB = getFirestore(app)
export const firebaseRealtimeDB = getDatabase()
export const firebaseStorage = getStorage()
export const auth = getAuth(app)
auth.languageCode = auth.useDeviceLanguage()
