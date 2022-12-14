import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'

import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import AsyncStorage from '@react-native-async-storage/async-storage'

const httpLink = new HttpLink({
  // uri: 'http://169.254.123.230:4000/',
  uri: 'http://10.0.2.2:4000', // for android emulator
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
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
  link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
  cache: new InMemoryCache(),
})

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(130, 88, 105)',
    accent: '#f1c40f',
  },
}

export const DarkMode = React.createContext('')

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <DarkMode.Provider value='dark'>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </DarkMode.Provider>
      </PaperProvider>
    </ApolloProvider>
  )
}
