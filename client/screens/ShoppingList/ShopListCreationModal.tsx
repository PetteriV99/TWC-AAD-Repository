import { ApolloQueryResult, gql, useMutation } from '@apollo/client'
import React from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'
import CustomModal from '../../components/CustomModal'

const CREATE_SHOPLIST = gql`
  mutation createShoppingList(
    $familyId: ID!
    $name: String!
    $description: String
  ) {
    newList(familyId: $familyId, name: $name, description: $description) {
      _id
      name
      description
      items
    }
  }
`

export default function FamilyCreationModal({
  refetch,
}: {
  refetch: () => Promise<ApolloQueryResult<any>>
}) {
  const [mutateFunction, { data, loading, error }] =
    useMutation(CREATE_SHOPLIST)

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  const submit = () => {
    mutateFunction({
      variables: {
        name,
        familyId: '63974f596179d0dfca7e15b2',
        ...(description && { description }),
      },
    })
  }

  React.useEffect(() => {
    if (data) {
      refetch()
    }
  }, [data])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <CustomModal buttonName='Add new shopping list'>
      <View style={styles.container}>
        <Text style={styles.title}>Add new shopping list</Text>
        <Text style={styles.subtitle}>Fill in the required details</Text>
        <TextInput
          style={styles.input}
          placeholder='Shopping list name *'
          placeholderTextColor='#A9A9A9'
          onChangeText={text => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder='Shopping list description'
          placeholderTextColor='#A9A9A9'
          onChangeText={text => setDescription(text)}
          value={description}
        />

        <View style={styles.buttonContainer}>
          <Button title='Create' onPress={() => submit()} />
        </View>
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
})
