import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'

export default function Family() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />

      <Text>My families:</Text>
      {['perhe', 'mafia', 'Vänttiset'].map(item => (
        <Text key={item}>{item}</Text>
      ))}
      <Button mode='contained'>Join/Add family</Button>
      <Button mode='contained'>Edit family</Button>
      <Button mode='contained'>Leave/Delete family</Button>

      <Button mode='contained'>Invite to family</Button>
      <Button mode='contained'>Accept invite to family</Button>
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
