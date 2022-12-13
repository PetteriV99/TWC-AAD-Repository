import { ApolloQueryResult, gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-paper'
import CustomModal from '../../components/CustomModal'
import DropDownInput from '../../components/DropDownInput'

const CREATE_SHOPLIST = gql`
  mutation CreateShoppingList(
    $createShoppingListFamilyId2: ID!
    $name: String!
    $description: String
  ) {
    createShoppingList(
      familyId: $createShoppingListFamilyId2
      name: $name
      description: $description
    ) {
      _id
      description
      familyId
      name
    }
  }
`

const USER_FAMILIES = gql`
  query UserFamilies {
    userFamilies(userId: "639059406a914ffbad0f2a49") {
      _id
      name
    }
  }
`

export default function CreateShopList({
  navigation: { navigate },
}: {
  navigation: any
}) {
  const [mutateFunction, { data, loading, error }] =
    useMutation(CREATE_SHOPLIST)

  const { data: familyData } = useQuery(USER_FAMILIES)

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [family, setFamily] = React.useState({ name: 'None', id: '' })

  const families = familyData.userFamilies.map((uf: any) => ({
    name: uf.name,
    id: uf._id,
  }))

  const submit = async () => {
    await mutateFunction({
      variables: {
        name,
        createShoppingListFamilyId2: family.id,
        ...(description && { description }),
      },
    })
    navigate('MainApp', { refetch: true })
  }

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add new shopping list</Text>
      <Text style={styles.subtitle}>Fill in the required details</Text>
      <Text>Selected family: {family.name}</Text>
      <DropDownInput
        style={styles.dropdown}
        title='Select family'
        items={families}
        setFunc={setFamily}
      />

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
