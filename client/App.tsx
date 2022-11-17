import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Button mode="contained">Sign up / Log in</Button>
      <Button mode="contained">Log out</Button>
      <Button mode="contained">View profile</Button>
      <Button mode="contained">Edit profile</Button>
      
      <Text>My families:</Text>
      {["perhe", "mafia", "Vänttiset"].map(item => (<Text key={item}>{item}</Text>))}
      <Button mode="contained">Join/Add family</Button>
      <Button mode="contained">Edit family</Button>
      <Button mode="contained">Leave/Delete family</Button>

      <Button mode="contained">Invite to family</Button>
      <Button mode="contained">Accept invite to family</Button>

      <Text>Family shopping list:</Text>
      {["lista1", "lista2", "lista3"].map(item => (<Text key={item}>{item}</Text>))}
      <Button mode="contained">Add shopping list</Button>
      <Button mode="contained">Modify shopping list</Button>
      <Button mode="contained">Delete shopping list</Button>


      <Text>Tavara 1</Text>
      <Button mode="contained">Add x amount of item to y shopping list</Button>
      <Checkbox status={'checked'} /> {/* x määrä tavaraa kärryssä ? */}

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
