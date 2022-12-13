import { ApolloQueryResult, gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import CustomModal from '../../components/CustomModal'
import DropDownInput from '../../components/DropDownInput'

const CREATE_SHOP_ITEM = gql`
  mutation CheckItemInShoppingList($listId: ID!, $name: String!, $quantity: Int!, $checked: Boolean!) {
    addItemToShoppingList(listId: $listId, name: $name, quantity: $quantity, checked: $checked) {
      _id
    }
  }
`

export default function CreateNewItem({
  route, navigation: { navigate },
}: {
  route: any, navigation: any
}) {
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_SHOP_ITEM)
  const { listId } = route.params

  const [name, setName] = React.useState('')
  const [quantity, setQuantity] = React.useState(0)
  const [family, setFamily] = React.useState({ name: 'None', id: '' })

  const submit = async () => {
    await mutateFunction({
      variables: {
        listId,
        name,
        quantity,
        checked: false,
      },
    })
    await navigate('Home', { listId, refetch: true })
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new shopping item to the list</Text>

      <TextInput
        style={styles.input}
        placeholder='Shopping list item name *'
        placeholderTextColor='#A9A9A9'
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder='Shopping list item quantity *'
        placeholderTextColor='#A9A9A9'
        keyboardType='numeric'
        onChangeText={text => setQuantity(Number(text))}
        value={String(quantity)}
      />

      <View style={styles.buttonContainer}>
        <Button mode='contained' onPress={() => submit()}>
          Create
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
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    width: 300,
    marginTop: 10,
  },
  dropdown: {
    width: 300,
    marginBottom: 10,
  },
})
