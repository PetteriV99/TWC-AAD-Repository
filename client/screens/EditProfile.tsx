import { StyleSheet, View } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import * as React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      email
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($username: String, $email: String, $password: String) {
    updateUser(username: $username, email: $email, password: $password) {
      email
      username
    }
  }
`

export default function EditProfile({ navigation: { navigate }}: { navigation: any }) {
  const { data, loading, error } = useQuery(CURRENT_USER)
  const [updateUser, mutationResult] = useMutation(UPDATE_USER)

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  React.useEffect(() => {
    if (data) {
      setUsername(data.currentUser.username)
      setEmail(data.currentUser.email)
      setPassword('')
    }
  }, [data])

  React.useEffect(() => {
    if (mutationResult.data) {
      navigate('Profile', { refetch: true })
    }
  }, [mutationResult.data])
      

  const submit = () => {
    updateUser({
      variables: {
        ...username && { username },
        ...email && { email },
        ...password && { password },
      },
    })
  } 

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        label="Name"
        value={username}
        onChangeText={(text) => {
          setUsername(text)}}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={() => submit()}
        style={styles.input}
      >
        Save
      </Button>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    marginBottom: 20,
  },
})
