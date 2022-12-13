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

// const GET_SHOPLIST = gql`
//   query GetShoplist($id: ID!) {
//     shoplist(_id: $id) {
//       name
//       description
//       avatar_url
//     }
//   }
// `

export default function Home({ route, navigation }: any) {
  const { loading, error, data, refetch } = useQuery(USER_FAMILIES)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  const families = route?.params?.listName ? data.userFamilies : []

  const currentList = route?.params?.listName ?? 'No selected list'
  // const query = useQuery(GET_SHOPLIST, { variables: { id: currentList } })

  // console.log('yetgfd', query)
  return (
    <ScrollView style={styles.container}>
      <List
        title={currentList}
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

      {route?.params?.listName === undefined && (
        <Text style={styles.center}>Please select a list</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  center: {
    flex: 1,
    alignSelf: 'center',
    margin: 20,
    padding: 10,
    justifyContent: 'center',
  },
})
