import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { GOOGLE_CLIENT_ID_FOR_ANDROID, GOOGLE_CLIENT_ID_FOR_IOS } from '@env'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { GoogleAuthProvider, signInWithCredential, User } from 'firebase/auth'
import { Platform } from 'react-native'
import { firebaseAuth } from '../repositories/firebase'

type Auth = {
  user: User | null
  loading: boolean
  googleSignIn: () => Promise<boolean>
  googleSignOut: () => Promise<boolean>
}

const AuthContext = createContext<Auth>({} as Auth)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const webClientId = Platform.OS === 'ios' ? GOOGLE_CLIENT_ID_FOR_IOS : GOOGLE_CLIENT_ID_FOR_ANDROID

  useEffect(() => {
    GoogleSignin.configure({ webClientId })
    const unsubscribed = firebaseAuth.onAuthStateChanged((user) => {
      setUser(user)
    })
    return () => {
      unsubscribed()
    }
  }, [])

  const handleCredentialResponse = async (googleIdToken: string) => {
    const credential = GoogleAuthProvider.credential(googleIdToken)

    const result = await signInWithCredential(firebaseAuth, credential)
    if (result) {
      setUser(result.user)
    }
  }

  const googleSignIn = async (): Promise<boolean> => {
    setLoading(true)
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      if (userInfo) {
        await handleCredentialResponse(userInfo.idToken!)
      }

      setLoading(false)
      return true
    } catch (error) {
      console.log(error)
      setLoading(false)
      return false
    }
  }

  const googleSignOut = async (): Promise<boolean> => {
    setLoading(true)
    try {
      await GoogleSignin.signOut()
      await firebaseAuth.signOut()
      setUser(null)
      setLoading(false)
      return true
    } catch (error) {
      console.log(error)
      setLoading(false)
      return false
    }
  }

  return {
    user,
    loading,
    googleSignIn,
    googleSignOut,
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const authContext = useAuthProvider()

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
}
