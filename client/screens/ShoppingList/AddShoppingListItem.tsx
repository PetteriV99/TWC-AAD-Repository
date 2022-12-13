import { ApolloQueryResult, gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native'
import { Button, IconButton, TextInput } from 'react-native-paper'
import CustomModal from '../../components/CustomModal'

// const UPDATE_SHOPLIST = gql`
//   mutation UpdateShoplist(
//     $shoplistId: ID!
//     $name: String
//     $description: String
//     $avatarUrl: String
//   ) {
//     updateShoplist(
//       shoplistId: $shoplistId
//       name: $name
//       description: $description
//       avatar_url: $avatarUrl
//     ) {
//       name
//     }
//   }
// `

// const DELETE_SHOPLIST = gql`
//   mutation DeleteShoplist($shoplistId: ID!) {
//     deleteShoplist(shoplistId: $shoplistId) {
//       _id
//       name
//       creator
//       members
//       lists
//       invites
//       description
//       avatar_url
//     }
//   }
// `

// const GET_SHOPLIST = gql`
//   query GetShoplist($id: ID!) {
//     shoplist(_id: $id) {
//       name
//       description
//       avatar_url
//     }
//   }
// `

export default function AddShoppingListItem({
  shoplistId,
}: {
  shoplistId: string
}) {
  // const [updateShoplistMutation] = useMutation(UPDATE_SHOPLIST)
  // const [deleteShoplistMutation] = useMutation(DELETE_SHOPLIST)
  // const query = useQuery(GET_SHOPLIST, { variables: { id: shoplistId } })

  // const { shoplist } = query.data || {}

  const [name, setName] = React.useState('')
  const [quantity, setQuantity] = React.useState('')

  // React.useEffect(() => {
  //   if (shoplist) {
  //     setName(shoplist.name)
  //     setDescription(shoplist.description)
  //     setAvatarUrl(shoplist.avatar_url)
  //   }
  // }, [shoplist])
  console.log('shoplist id', shoplistId)
  return (
    <CustomModal buttonName='Add'>
      <View style={styles.container}>
        <Text style={styles.title}>Add shopping list item</Text>

        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder='Shoplist name *'
          placeholderTextColor='#A9A9A9'
          onChangeText={text => setName(text)}
          value={name}
        />

        <Text>Quantity</Text>
        <TextInput
          style={styles.input}
          placeholder='Quantity'
          placeholderTextColor='#A9A9A9'
          onChangeText={text => setQuantity(text)}
          value={quantity}
        />

        <Button
          mode='contained'
          // onPress={async () => {
          //   updateShoplistMutation({
          //     variables: {
          //       shoplistId,
          //       ...(name && { name }),
          //       ...(description && { description }),
          //     },
          //   })
          // }}
        >
          Add
        </Button>
      </View>
    </CustomModal>
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
