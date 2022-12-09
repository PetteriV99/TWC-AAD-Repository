import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'
import { Provider as PaperProvider } from 'react-native-paper'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000/',
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
