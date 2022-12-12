import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import CustomModal from '../components/CustomModal'

const UPDATE_SHOPPING_LIST = gql`
  mutation Mutation($listId: ID!, $name: String, $description: String) {
    updateShoppingList(
      listId: $listId
      name: $name
      description: $description
    ) {
      description
      name
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

export default function EditShoppingList({
  familyId,
  listName,
}: {
  familyId: string
  listName: string
}) {
  const [update] = useMutation(UPDATE_SHOPPING_LIST)
  const query = useQuery(GET_SHOPPING_LISTS, {
    variables: { familyId: familyId },
  })

  const { familyLists } = query.data || {}

  const [listId, setListId] = React.useState('')
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    if (familyLists) {
      const currentList = familyLists.find(
        (list: any) => list.name === listName
      )
      if (!currentList) return
      setListId(currentList._id)
      setName(currentList.name)
      setDescription(currentList.description)
    }
  }, [familyLists])

  if (query.loading) return <Text>Loading...</Text>
  if (query.error) return <Text>{query.error.message}</Text>

  // Maybe add some input validations here

  return (
    <CustomModal buttonName='Edit'>
      <View style={styles.container}>
        <Text>Edit shopping list details</Text>
        <TextInput
          label='Name'
          value={name}
          onChangeText={text => setName(text)}
        />

        <TextInput
          label='Description'
          value={description}
          onChangeText={text => setDescription(text)}
        />

        <Button
          mode='contained'
          onPress={async () => {
            update({
              variables: {
                listId,
                ...(name && { name }),
                ...(description && { description }),
              },
            })
          }}
        >
          Update
        </Button>
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  container: {},
})
