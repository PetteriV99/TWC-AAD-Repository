import { ApolloQueryResult, gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import CustomModal from '../../components/CustomModal'

const UPDATE_SHOPLIST = gql`
  mutation UpdateShoplist(
    $shoplistId: ID!
    $name: String
    $description: String
    $avatarUrl: String
  ) {
    updateShoplist(
      shoplistId: $shoplistId
      name: $name
      description: $description
      avatar_url: $avatarUrl
    ) {
      name
    }
  }
`

const DELETE_SHOPLIST = gql`
  mutation DeleteShoplist($shoplistId: ID!) {
    deleteShoplist(shoplistId: $shoplistId) {
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
  const [updateShoplistMutation] = useMutation(UPDATE_SHOPLIST)
  const [deleteShoplistMutation] = useMutation(DELETE_SHOPLIST)
  const shoplistId = route.params.shoplistId
  console.log(shoplistId)
  const query = useQuery(GET_SHOPLIST, { variables: { id: shoplistId } })

  const { shoplist } = query.data || {}

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [avatarUrl, setAvatarUrl] = React.useState('')

  React.useEffect(() => {
    if (shoplist) {
      setName(shoplist.name)
      setDescription(shoplist.description)
    }
  }, [shoplist])

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
          updateShoplistMutation({
            variables: {
              shoplistId,
              ...(name && { name }),
              ...(description && { description }),
              ...(avatarUrl && { avatarUrl }),
            },
          })
        }}
      >
        Update
      </Button>

      <Button
        mode='contained'
        onPress={async () => {
          deleteShoplistMutation({
            variables: {
              shoplistId,
            },
          })
        }}
      >
        Delete
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
