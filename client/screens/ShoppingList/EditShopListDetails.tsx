import { ApolloQueryResult, gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import CustomModal from '../../components/CustomModal'

const UPDATE_SHOPLIST = gql`
  mutation UpdateShoppingList($listId: ID!, $name: String, $description: String) {
    updateShoppingList(listId: $listId, name: $name, description: $description) {
      _id
      familyId
      name
      description
    }
  }
`

const GET_SHOPLIST = gql`
  query ShoppingList($id: ID!) {
    shoppingList(_id: $id) {
      _id
      name
      description
    }
  }
`

export default function ShoplistEditModal({
  route, navigation: { navigate },
}: {
  route: any, navigation: any
}) {
  const listId = route.params.shoplistId
  const query = useQuery(GET_SHOPLIST, { variables: { id: listId } })

  const [updateShoplistMutation, updateShopListData] = useMutation(UPDATE_SHOPLIST)

  const { shoppingList } = query.data || {}

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    query.refetch()
  }, [])

  React.useEffect(() => {
    if (shoppingList) {
      setName(shoppingList.name)
      setDescription(shoppingList.description)
    }
  }, [query.data])

  if (query.loading) return <Text>Loading...</Text>
  if (query.error) return <Text>{query.error.message}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Shoplist details</Text>

      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder='Shoplist name *'
        placeholderTextColor='#A9A9A9'
        onChangeText={text => setName(text)}
        value={name}
      />

      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder='Description'
        placeholderTextColor='#A9A9A9'
        onChangeText={text => setDescription(text)}
        value={description}
      />

      <Button
        mode='contained'
        onPress={async () => {
          await updateShoplistMutation({
            variables: {
              listId,
              ...name && { name },
              ...description && { description },
            },
          })
          await navigate('Shopping Lists', { refetch: true })
        }}
      >
        Update
      </Button>
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
