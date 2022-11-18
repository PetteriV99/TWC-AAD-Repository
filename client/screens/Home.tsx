import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Text>Tavara 1</Text>
      <Button mode='contained'>Add x amount of item to y shopping list</Button>
      <Checkbox status='checked' />
      {/* x määrä tavaraa kärryssä ? */}
      {/* shopping listan pitää päivittyä kun shoppailee  */}
      {/* - a user can update the shopping list when shopping after the shopping list is opened in the app (1 point), or app queries the list in short time intervals (2 point), or the backend can push the

changed data into the shopping list in real-time when the user is shopping and the shopping list is open (4 points) */}
      {/* the app has a personal look and feel (2 points)

- the usability of the app is good (2 points) */}
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
