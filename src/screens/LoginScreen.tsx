import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useAuthContext } from '../hooks/auth'

const LoginScreen = () => {
  const { googleSignIn } = useAuthContext()

  return (
    <SafeAreaView>
      <GoogleSigninButton
        style={{ width: 210 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={googleSignIn}
      />
    </SafeAreaView>
  )
}

export default LoginScreen
