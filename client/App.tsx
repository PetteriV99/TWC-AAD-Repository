import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'
import { Provider as PaperProvider } from 'react-native-paper'

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </PaperProvider>
  )
}
