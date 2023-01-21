import React from 'react'
import { Text, SafeAreaView, Button } from 'react-native'
import { useAuthContext } from '../hooks/auth'

const HomeScreen = () => {
  const { googleSignOut } = useAuthContext()

  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button title="サインアウト" onPress={googleSignOut} />
    </SafeAreaView>
  )
}

export default HomeScreen
