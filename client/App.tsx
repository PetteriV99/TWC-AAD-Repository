import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'
import { Provider as PaperProvider } from 'react-native-paper'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://10.0.2.2:4000/',
});

const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('token');
  const token = 'token'
  return {
    headers: {
      ...headers,
      authorization: token ? token : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  )
}
