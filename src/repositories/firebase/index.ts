import firebase from 'firebase/compat/app'
import 'firebase/auth'
import 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import firebaseConfig from './config'
import { initializeApp } from 'firebase/app'

export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

export default firebase
