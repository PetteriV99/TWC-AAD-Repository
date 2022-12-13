import React, { useContext } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import List from '../components/List'
import { gql, useQuery } from '@apollo/client'
import EditShoppingList from './ShoppingList/EditShoppingList'
import ShopListCreationModal from './ShoppingList/CreateShopList'

const FAMILY_SHOPPING_LISTS = gql`
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

export default function ShoppingList({ route, navigation }: { route: any; navigation: any }) {
  const { loading, error, data, refetch } = useQuery(FAMILY_SHOPPING_LISTS)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  const families = data.userFamilies

  const allShoppingLists = families
    .map((f: any) =>
      f.lists.map((l: any, i: number) => ({
        
        key: f._id + i,
        familyId: f._id,
        name: l,
      }))
    )
    .flat()

  return (
    <ScrollView style={styles.container}>
      <Button
        mode='contained'
        onPress={async () => {
          refetch()
        }}
      >
        Refresh
      </Button>
      <List
        navigation={navigation}
        title='My family shopping lists'
        headers={[{ id: 1, title: 'Name' }]}
        items={allShoppingLists.map((l: any) => ({
          id: l.key,
          familyId: l.familyId,
          name: l.name,
        }))}
        listType={'lists'}
      />

      <Button style={styles.button} mode='contained' onPress={() => navigation.navigate('CreateShopList')}>
        Create new shopping list
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
  button: {
    marginTop: 10,
  },
})
