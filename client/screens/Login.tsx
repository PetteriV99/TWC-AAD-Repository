import { StyleSheet, ScrollView } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { gql } from '@apollo/client/core'
import { useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LOGIN = gql`
  mutation LogIn($email: String, $password: String!) {
    logIn(email: $email, password: $password)
  }
`

export default function Login({ navigation }: any) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [login, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted: data => {
      storeToken(data.logIn)
    },
    onError: err => {
      console.log(err)
    },
  })

  const handleSubmit = () => {
    login({ variables: { email, password } })
  }

  const storeToken = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('AUTH_KEY', jsonValue).then(
        navigation.navigate('MainApp')
      )
    } catch (e) {
      // saving error
    }
  }

  return (
    <ScrollView style={{ marginTop: 50, padding: 20 }}>
      <Text
        style={{ padding: 10, margin: 10, textAlign: 'center', fontSize: 25 }}
      >
        Login
      </Text>
      <TextInput
        label='Email'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        label='Password'
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Divider style={{ marginVertical: 20 }} />
      <Button mode='contained' onPress={handleSubmit}>
        Login
      </Button>

      <Button mode='text' onPress={() => navigation.navigate('Register')}>
        Don't have an account? Sign up
      </Button>
      {/* Temp field to see login process. Need to add error handling to backend */}
      <Text>
        {loading
          ? 'Loading...'
          : error
          ? error.graphQLErrors.map(({ message }, i) => {return(<Text key={i}>{message}</Text>)})
          : data && data.logIn}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 10,
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
