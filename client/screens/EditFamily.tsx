import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

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

export default function EditFamily({ familyId }: { familyId: string }) {
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

  // Maybe add some input validations here

  return (
    <View style={styles.container}>
      <Text>Edit Family details</Text>
      <TextInput
        label='Name'
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        label='Description'
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TextInput
        label='Avatar Url'
        value={avatarUrl}
        onChangeText={(text) => setAvatarUrl(text)}
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
  )
}

const styles = StyleSheet.create({
  container: {
  },
})
