import { ApolloQueryResult, gql, useMutation } from "@apollo/client"
import React from "react"
import { View, TextInput, Button, StyleSheet, Text } from "react-native"
import CustomModal from "../components/CustomModal"

const CREATE_FAMILY = gql`
  mutation CreateFamily($name: String!, $description: String, $avatarUrl: String) {
    createFamily(name: $name, description: $description, avatar_url: $avatarUrl) {
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

export default function FamilyCreationModal({ refetch }: { refetch: () => Promise<ApolloQueryResult<any>> }) {
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_FAMILY)

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [avatarUrl, setAvatarUrl] = React.useState("")

  const submit = () => {
    mutateFunction({
      variables: {
        name,
        ...description && { description },
        ...avatarUrl && { avatarUrl },
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
    <CustomModal buttonName="Create a new family">
      <View style={styles.container}>
        <Text style={styles.title}>Create a new family</Text>
        <Text style={styles.subtitle}>Fill in the required details</Text>
        <TextInput
          style={styles.input}
          placeholder="Family name *"
          placeholderTextColor="#A9A9A9"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Family description"
          placeholderTextColor="#A9A9A9"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <TextInput
          style={styles.input}
          placeholder="Family avatar url"
          placeholderTextColor="#A9A9A9"
          onChangeText={(text) => setAvatarUrl(text)}
          value={avatarUrl}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Create"
            onPress={() => submit()}
          />
        </View>
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
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
