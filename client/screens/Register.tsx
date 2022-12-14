import { StyleSheet, ScrollView } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { gql } from '@apollo/client/core'
import { useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'

const REGISTER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password)
  }
`

export default function Login({ navigation }: any) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [register, { data, loading, error, client }] = useMutation(REGISTER, {
    onCompleted: data => {
      client.resetStore()
      storeToken(data.signUp)
    },
    onError: err => {
      console.log(err)
    },
  })

  const handleSubmit = () => {
    register({ variables: { username, email, password } })
  }

  const storeToken = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('AUTH_KEY', jsonValue).then(() => {
        navigation.navigate('MainApp')
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <ScrollView style={{ marginTop: 50, padding: 20 }}>
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
        secureTextEntry
        label='Password'
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Divider style={{ marginVertical: 20 }} />
      <Button mode='contained' onPress={handleSubmit}>
        Register
      </Button>
      <Text style={{marginTop: 10}}>
        {loading
          ? 'Loading...'
          : error
          ? error.graphQLErrors.map(({ message }, i) => {
              return <Text key={i}>{message}</Text>
            })
          : data && null}
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
