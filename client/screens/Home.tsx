import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ScrollView } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import * as React from 'react'
import List from '../components/List'
import { gql, useQuery } from '@apollo/client'

const USER_FAMILIES = gql`
  query UserFamilies {
    userFamilies(userId: "639059406a914ffbad0f2a49") {
      _id
      name
      creator
      members
      lists
      invites
      description
      avatar_url
    }
  }
`
export default function Home() {
  const { loading, error, data, refetch } = useQuery(USER_FAMILIES)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  const families = data.userFamilies
  return (
    <ScrollView style={styles.container}>
      <List
        title='Current shopping list'
        headers={[
          { id: 1, title: 'Name' },
          { id: 2, title: 'Collected' },
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

      <List
        title='Current Shopping List'
        headers={[
          { id: 1, title: 'Name' },
          { id: 2, title: 'Collected' },
        ]}
        items={families.map((family: any) => ({
          id: family._id,
          name: family.name,
        }))}
        listType={'shopping'}
      />

      {/* x määrä tavaraa kärryssä ? */}
      {/* shopping listan pitää päivittyä kun shoppailee  */}
      {/* - a user can update the shopping list when shopping after the shopping list is opened in the app (1 point), or app queries the list in short time intervals (2 point), or the backend can push the

changed data into the shopping list in real-time when the user is shopping and the shopping list is open (4 points) */}
      {/* the app has a personal look and feel (2 points)

- the usability of the app is good (2 points) */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
})
