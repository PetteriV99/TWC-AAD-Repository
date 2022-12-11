import { ApolloQueryResult, gql, useMutation, useQuery } from "@apollo/client"
import React from "react"
import { View, StyleSheet, Text, ScrollView, Pressable } from "react-native"
import { Button, IconButton, TextInput } from "react-native-paper"
import CustomModal from "../components/CustomModal"

const UPDATE_FAMILY = gql`
  mutation UpdateFamily($familyId: ID!, $name: String, $description: String, $avatarUrl: String) {
    updateFamily(familyId: $familyId, name: $name, description: $description, avatar_url: $avatarUrl) {
      name
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

export default function FamilyEditModal({ familyId }: { familyId: string }) {
  const [update] = useMutation(UPDATE_FAMILY)
  const query = useQuery(GET_FAMILY, { variables: { id: familyId } });

  const { family } = query.data || {}

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [avatarUrl, setAvatarUrl] = React.useState('')

  React.useEffect(() => {
    if (family) {
      setName(family.name)
      setDescription(family.description)
      setAvatarUrl(family.avatar_url)
    }
  }, [family])

  if (query.loading) return <Text>Loading...</Text>
  if (query.error) return <Text>{query.error.message}</Text>

  return (
    <CustomModal buttonName="Edit">
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

        <Text>Avatar URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Avatar URL"
          placeholderTextColor="#A9A9A9"
          onChangeText={(text) => setAvatarUrl(text)}
          value={avatarUrl}
        />

        <Button mode='contained' onPress={async () => {
          update({ variables: {
            familyId,
            ...name && {name},
            ...description && {description},
            ...avatarUrl && {avatarUrl},
          }})
        }}>Update</Button>
      </View>
    </CustomModal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
