import React, { useContext } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import List from '../components/List'
import { gql, useQuery } from '@apollo/client'
import EditShoppingList from './EditShoppingList'
import ShopListCreationModal from './ShopListCreationModal'

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
export default function Shopping({ navigation }: any) {
  const { loading, error, data, refetch } = useQuery(FAMILY_SHOPPING_LISTS)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  const families = data.userFamilies

  let allShoppingLists = families
    .map((f: any) => ({ familyId: f._id, lists: f.lists }))
    .flat()

  console.log(allShoppingLists)

  const testing = [
    {
      familyId: '63974f596179d0dfca7e15b2',
      lists: [{}],
    },
  ]

  return (
    <ScrollView style={styles.container}>
      {/* TODO: Painamalla riviä tai nimeä tai nappia näkee ostoslistan etusivulla
        ja/tai modalissa? */}

      <List
        title='My family shopping lists'
        headers={[{ id: 1, title: 'Name' }]}
        items={testing.map((l: any) => ({
          id: l.familyId,
          name: l.name,
        }))}
        // items={testing.map((l: any) => ({
        //   id: l.familyId,
        //   name: l.name,
        // }))}
        listType={'lists'}
      />

      {/*  TODO: lisääkö tämä ylempään listaan uuden ostoslistan? */}
      <Button
        mode='contained'
        // onPress={() => navigation.navigate('EditShoppingLists')}
      >
        Add new shopping list
      </Button>
      <ShopListCreationModal refetch={refetch} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
})
