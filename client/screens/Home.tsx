import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import * as React from 'react'
import List from '../components/List'

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>This is shopping list y</Text>
      <List
        headers={[
          { id: 1, title: 'Name' },
          { id: 2, title: 'Quantity' },
          { id: 3, title: 'Collected' },
        ]}
        items={[
          {
            id: 1,
            name: 'tomaatti',
            quantity: 10,
            collected: 10,
          },
          {
            id: 2,
            name: 'omena',
            quantity: 2,
            collected: 0,
          },
        ]}
        listType={'shopping'}
      />

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
