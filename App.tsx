import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/hooks/auth';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from './src/hooks/auth';

const Stack = createNativeStackNavigator();

export const RootStack = () => {
  const { user } = useAuthContext();

  return (
    <Stack.Navigator>
      {user ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <RootStack />
      </AuthProvider>
    </NavigationContainer>
  );
}