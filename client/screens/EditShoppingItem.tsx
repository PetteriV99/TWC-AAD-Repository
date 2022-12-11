import { StyleSheet, View } from 'react-native'
import { Button, Checkbox, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

const UPDATE_SHOPPING_LIST_ITEM = gql`
  mutation Mutation($listId: ID!, $currentName: String!, $newName: String, $quantity: Int, $checked: Boolean) {
    updateItemInShoppingList(listId: $listId, currentName: $currentName, newName: $newName, quantity: $quantity, checked: $checked) {
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

const GET_SHOPPING_LISTS = gql`
  query Query($familyId: ID!) {
    familyLists(familyId: $familyId) {
      _id
      name
      items {
        name
        quantity
        checked
      }
    }
  }
`

export default function EditShoppingItem({ familyId, listName, currentName }: { familyId: string, listName: string, currentName: string }) {
  const [update] = useMutation(UPDATE_SHOPPING_LIST_ITEM)
  const query = useQuery(GET_SHOPPING_LISTS, { variables: { familyId: familyId } });

  const { familyLists } = query.data || {}

  const [listId, setListId] = React.useState('')
  const [newName, setNewName] = React.useState('')
  const [quantity, setQuantity] = React.useState(0)
  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    if (familyLists) {
      const currentList = familyLists.find((list: any) => list.name === listName)
      if (!currentList) return;
      setListId(currentList._id)
      const currentItem = currentList.items.find((item: any) => item.name === currentName)
      if (!currentItem) return;
      setNewName(currentItem.name)
      setQuantity(currentItem.quantity)
      setChecked(currentItem.checked)
    }
  }, [familyLists])

  if (query.loading) return <Text>Loading...</Text>
  if (query.error) return <Text>{query.error.message}</Text>

  // Maybe add some input validations here

  return (
    <View style={styles.container}>
      <Text>Edit shopping list details</Text>
      <TextInput
        label='Name'
        value={newName}
        onChangeText={(text) => setNewName(text)}
      />

      <TextInput
        label='Quantity'
        value={String(quantity)}
        onChangeText={(text) => setQuantity(parseInt(text))}
      />

      <Text>Checked</Text>
      <Checkbox status={checked ? 'checked' : 'unchecked'} onPress={() => setChecked(!checked)} />

      <Button mode='contained' onPress={async () => {
        update({ variables: {
          listId,
          currentName,
          ...newName && {newName},
          ...quantity && {quantity},
          ...checked && {checked},
        }})
      }}>Update</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
})
