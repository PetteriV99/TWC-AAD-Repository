import { Button, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import * as React from 'react'
import { useState } from 'react'
import CustomModal from './CustomModal'

export default function Test() {
  const [state, setState] = useState(0)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is a test</Text>
      <Button title='add' onPress={() => setState(state + 1)} />
      <Text> number {state}</Text>

      <CustomModal buttonName='testi nappi' />
      <FlatList
        data={[
          { id: 1, title: 'Name' },
          { id: 2, title: 'Quantity' },
          { id: 3, title: 'Collected' },
        ]}
        renderItem={i => <Text>{i.item.title}</Text>}
      />
      <ScrollView style={{ marginHorizontal: 100 }}>
        <Text style={styles.text}>
          aaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaa
          aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa aaaaaaaaa
          aaaaaaaaaaaaaaa aaaaaaaaaaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaa
          aaaaaaaaaaaaaaaaaa
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'green',
    fontSize: 25,
    padding: 30,
  },
})
