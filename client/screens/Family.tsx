import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import List from '../components/List'

export default function Family() {
  return (
    <View>
      <List
        title='My families'
        headers={[{ id: 1, title: 'Name' }]}
        items={[
          {
            id: 1,
            name: 'Vänttiset',
          },
          {
            id: 2,
            name: 'Mafia',
          },
        ]}
        listType={'family'}
      />

      {/* TODO: aukeaako tästä modali jossa kaikki perheet joihin voi liittyä? */}
      <Button mode='contained'>Join/Add new family</Button>

      {/* TODO: olisiko tätä varten erillinen lista jossa kutsut muihin perheisiin?
      VAI modali jossa on mahdolliset kutsut?
      */}
      <Button mode='contained'>Accept invite to family</Button>
    </View>
  )
}
