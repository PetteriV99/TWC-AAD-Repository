import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Button mode='contained'>Sign up / Log in</Button>
      <Button mode='contained'>Log out</Button>
      <Text>Käyttäjän nimi</Text>
      <Text>jotain muuta tietoa</Text>
      <Button mode='contained'>Edit profile</Button>
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
