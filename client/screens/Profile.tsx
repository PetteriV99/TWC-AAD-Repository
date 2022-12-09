import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'

export default function Profile({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Login')} mode='contained'>
        Sign up / Log in
      </Button>
      <Button mode='contained'>Log out</Button>
      <Text>Käyttäjän nimi</Text>
      <Text>jotain muuta tietoa</Text>
      <Button
        onPress={() => navigation.navigate('EditProfile')}
        mode='contained'
      >
        Edit profile
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
