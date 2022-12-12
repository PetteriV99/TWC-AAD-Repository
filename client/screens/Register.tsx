import { StyleSheet, View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { gql } from '@apollo/client/core'
import { useMutation } from '@apollo/client'

const REGISTER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`

export default function Login({ navigation }: any) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [register, { data, loading, error }] = useMutation(REGISTER)

  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <Text
        style={{ padding: 10, margin: 10, textAlign: 'center', fontSize: 25 }}
      >
        Register
      </Text>
      <TextInput
        label='Username'
        value={username}
        onChangeText={text => setUsername(text)}
      />
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
      <Button
        mode='contained'
        onPress={async () => {
          register({ variables: { username, email, password } })
        }}
      >
        Register
      </Button>
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
