import React, { useContext } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import List from '../components/List'
import { gql, useQuery } from '@apollo/client'
import EditShoppingList from './ShoppingList/EditShoppingList'
import ShopListCreationModal from './ShoppingList/CreateShopList'

const FAMILY_SHOPPING_LISTS = gql`
  query UserFamilyLists {
    userFamilyLists {
      _id
      familyId
      name
      description
      items {
        name
        quantity
        checked
      }
    }
  }
`

export default function ShoppingList({ route, navigation }: { route: any; navigation: any }) {
  const { loading, error, data, refetch } = useQuery(FAMILY_SHOPPING_LISTS)

  const [shoppingLists, setShoppingLists] = React.useState([])

  React.useEffect(() => {
    if (!route.params || route.params.refetch) {
      refetch()
      if (route.params) route.params.refetch = false
    }
  }, [route.params])

  React.useEffect(() => {
    if (data) {
      setShoppingLists(data.userFamilyLists)
    }
  }, [data])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

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
        items={shoppingLists.map((list: any) => ({
          id: list._id,
          familyId: list.familyId,
          name: list.name,
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
