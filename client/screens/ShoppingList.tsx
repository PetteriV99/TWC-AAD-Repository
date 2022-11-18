import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'

export default function ShoppingList() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Text>Family shopping list:</Text>
      {['lista1', 'lista2', 'lista3'].map(item => (
        <Text key={item}>{item}</Text>
      ))}
      <Button mode='contained'>Add shopping list</Button>
      <Button mode='contained'>Modify shopping list</Button>
      <Button mode='contained'>Delete shopping list</Button>
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
