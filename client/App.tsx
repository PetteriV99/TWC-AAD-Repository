import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'

import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { setContext } from '@apollo/client/link/context'
import AsyncStorage from '@react-native-async-storage/async-storage'

const httpLink = new HttpLink({
  uri: 'http://169.254.123.230:4000/',
})

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('AUTH_KEY')

  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const DarkMode = React.createContext('')

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={DefaultTheme}>
        <DarkMode.Provider value=''>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </DarkMode.Provider>
      </PaperProvider>
    </ApolloProvider>
  )
}
