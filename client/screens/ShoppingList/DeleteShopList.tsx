import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import CustomModal from '../../components/CustomModal'

const DELETE_SHOPPING_LIST = gql`
  mutation Mutation($listId: ID!) {
    deleteShoppingList(listId: $listId) {
      _id
    }
  }
`

const GET_SHOPPING_LISTS = gql`
  query Query($familyId: ID!) {
    familyLists(familyId: $familyId) {
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

export default function DeleteShopList({
  route, navigation: { navigate },
}: {
  route: any, navigation: any
}) {
  const [deleteList] = useMutation(DELETE_SHOPPING_LIST)
  const query = useQuery(GET_SHOPPING_LISTS, {
    variables: { familyId: route.params.familyId },
  })

  const listId = route.params.shoplistId

  if (query.loading) return <Text>Loading...</Text>
  if (query.error) return <Text>{query.error.message}</Text>

  // Maybe add some input validations here

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete shopping list</Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          margin: 10,
        }}
      >
        <Button
          mode='contained'
          onPress={async () => {}}
          style={{
            margin: 5,
          }}
        >
          No
        </Button>
        <Button
          style={{
            margin: 5,
          }}
          mode='contained'
          onPress={async () => {
            await deleteList({
              variables: {
                listId,
              },
            })
            await navigate('Shopping Lists', { refetch: true })
          }}
        >
          Yes
        </Button>
      </View>
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
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    borderColor: '#A9A9A9',
  },
})
