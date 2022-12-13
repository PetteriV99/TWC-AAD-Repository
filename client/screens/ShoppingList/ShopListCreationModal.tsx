import { ApolloQueryResult, gql, useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { View, TextInput, Button, StyleSheet, Text } from 'react-native'
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

export default function FamilyCreationModal({
  refetch,
}: {
  refetch: () => Promise<ApolloQueryResult<any>>
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

  const submit = () => {
    mutateFunction({
      variables: {
        name,
        createShoppingListFamilyId2: family.id,
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
        <Text>Selected family: {family.name}</Text>
        <DropDownInput
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
