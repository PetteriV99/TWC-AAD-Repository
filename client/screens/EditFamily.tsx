import { ApolloQueryResult, gql, useMutation, useQuery } from "@apollo/client"
import React from "react"
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native"
import { Button, IconButton, TextInput } from "react-native-paper"

const UPDATE_FAMILY = gql`
  mutation UpdateFamily($familyId: ID!, $name: String, $description: String, $avatarUrl: String) {
    updateFamily(familyId: $familyId, name: $name, description: $description, avatar_url: $avatarUrl) {
      name
    }
  }
`

const DELETE_FAMILY = gql`
  mutation DeleteFamily($familyId: ID!) {
    deleteFamily(familyId: $familyId) {
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

const GET_FAMILY = gql`
  query GetFamily($id: ID!) {
    family(_id: $id) {
      name
      description
      avatar_url
    }
  }
`

export default function EditFamily({ route, navigation: { navigate } }: { route: any, navigation: any }) {
  const [updateFamilyMutation] = useMutation(UPDATE_FAMILY)
  const [deleteFamilyMutation] = useMutation(DELETE_FAMILY)
  const familyId = route.params.familyId

  const getFamilyQuery = useQuery(GET_FAMILY, { variables: { id: familyId } });

  const { family } = getFamilyQuery.data || {}

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [avatarUrl, setAvatarUrl] = React.useState('')

  React.useEffect(() => {
    getFamilyQuery.refetch()
  }, [])

  React.useEffect(() => {
    if (family) {
      setName(family.name)
      setDescription(family.description)
      setAvatarUrl(family.avatar_url)
    }
  }, [family])

  if (getFamilyQuery.loading) return <Text>Loading...</Text>
  if (getFamilyQuery.error) return <Text>{getFamilyQuery.error.message}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Family details</Text>

      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Family name *"
        placeholderTextColor="#A9A9A9"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#A9A9A9"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <Button mode='contained' onPress={async () => {
        await updateFamilyMutation({ variables: {
          familyId,
          ...name && {name},
          ...description && {description},
        }})
        await navigate('Family', { refetch: true })
      }}>Update</Button>

      <Button mode='contained' onPress={async () => {
        deleteFamilyMutation({ variables: {
          familyId,
        }})
      }}>Delete</Button>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    borderColor: "#A9A9A9",
  },
})
