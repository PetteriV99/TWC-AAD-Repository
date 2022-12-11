import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import List from '../components/List'

export default function Shopping() {
  return (
    <View>
      {/* TODO: Painamalla riviä tai nimeä tai nappia näkee ostoslistan etusivulla
        ja/tai modalissa? */}

      <List
        title='My family shopping lists'
        headers={[{ id: 1, title: 'Name' }]}
        items={[
          {
            id: 1,
            name: 'perheen x lista1',
          },
          {
            id: 2,
            name: 'perheen y lista2',
          },
        ]}
        listType={'lists'}
      />

      {/*  TODO: lisääkö tämä ylempään listaan uuden ostoslistan? */}
      <Button mode='contained'>Add new shopping list</Button>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })
