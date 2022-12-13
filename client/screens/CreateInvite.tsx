import { ApolloQueryResult, gql, useMutation, useQuery } from "@apollo/client"
import React from "react"
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Pressable } from "react-native"
import { IconButton } from "react-native-paper"
import CustomModal from "../components/CustomModal"

const USERS = gql`
  query Users {
    users {
      id
      username
      email
      password
      first_name
      last_name
      avatar_url
    }
  }
`

const SEND_INVITE = gql`
  mutation InviteToFamily($familyId: ID!, $userId: ID!) {
    inviteToFamily(familyId: $familyId, userId: $userId) {
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

export default function CreateInvite({ route, navigation: { navigate } }: { route: any, navigation: any }) {
  const { data, loading, error, refetch} = useQuery(USERS)
  const [mutateFunction, mutateResult ] = useMutation(SEND_INVITE)
  const familyId = route.params.familyId

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite to family</Text>
      <ScrollView style={styles.scrollView}>
        {data.users.map((user: any) => (
          <View key={user.id} style={styles.user}>
            <Text style={styles.username}>{user.username}</Text>
            <IconButton
              icon="account-plus"
              color="#000"
              size={20}
              onPress={() => {
                mutateFunction({ variables: { familyId, userId: user.id } });
                navigate('Family', { refetch: true });
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollView: {
    width: "70%",
  },
  user: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  username: {
    fontSize: 16,
  },
})
