import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { gql } from '@apollo/client/core'
import { useMutation } from '@apollo/client'

const LOGIN = gql`
  mutation LogIn($email: String!, $password: String!) {
    logIn(email: $email, password: $password)
  }
`

export default function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [login, { data, loading, error }] = useMutation(LOGIN)

  return (
    <View style={{ marginTop: 50 }}>
      <Text style={{ fontSize: 30 }}>Login / Register</Text>
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
      <Button
        mode='contained'
        onPress={async () => {
          login({ variables: { email, password } })
        }}
      >
        Login
      </Button>

      {/* Temp field to see login process. Need to add error handling to backend */}
      <Text>
        {loading
          ? 'Loading...'
          : error
          ? 'Some error happened'
          : data && data.logIn}
      </Text>
    </View>
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
