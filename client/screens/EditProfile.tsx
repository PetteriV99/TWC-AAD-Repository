import { StyleSheet, View } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import * as React from 'react'

export default function EditProfile() {
  const [text, setText] = React.useState('')

  return (
    <View style={{ marginTop: 50 }}>
      <Text style={{ fontSize: 30 }}>Edit name or password</Text>
      <TextInput
        label='Email'
        value={text}
        onChangeText={text => setText(text)}
      />
      <TextInput
        label='Password'
        value={text}
        onChangeText={text => setText(text)}
      />
    </View>
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
