import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'react-native-paper'
import * as React from 'react'
import { DarkMode } from '../App'
export default function EditProfile({
  navigation: { navigate },
}: {
  navigation: any
}) {
  const dark = React.useContext(DarkMode)
  console.log(dark)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change theme</Text>
      <Button>Set Theme</Button>
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
