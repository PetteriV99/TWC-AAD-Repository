import { ApolloQueryResult, gql, useMutation, useQuery } from "@apollo/client"
import React from "react"
import { View, TextInput, Button, StyleSheet, Text, ScrollView, Pressable } from "react-native"
import { IconButton } from "react-native-paper"
import CustomModal from "../components/CustomModal"

const FAMILY_INVITES = gql`
  query UserInvites {
    userInvites(userId: "639059406a914ffbad0f2a49") {
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

const ACCEPT_FAMILY_INVITE = gql`
  mutation FamilyInviteResponse($familyId: ID!, $accept: Boolean!) {
    familyInviteResponse(familyId: $familyId, accept: $accept) {
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

export default function FamilyInvitesModal({ refetchFamilies }: { refetchFamilies: () => Promise<ApolloQueryResult<any>> }) {
  const { data, loading, error, refetch} = useQuery(FAMILY_INVITES)
  const [mutateFunction, mutateResult ] = useMutation(ACCEPT_FAMILY_INVITE)

  const [invites, setInvites] = React.useState([])

  React.useEffect(() => {
    if (mutateResult.data) {
      refetchFamilies()
      refetch()
    }
  }, [mutateResult.data])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  if (data) {
    if (data.userInvites.length === 0) return null
  }

  return (
    <CustomModal buttonName="Available invites !">
      <View style={styles.container}>
        <Text style={styles.title}>Available invites</Text>
        <Text style={styles.subtitle}>Click on an invite to join</Text>
        <ScrollView>
          {data.userInvites.map((invite: any) => (
            <View style={styles.pressableRow } key={invite._id}>
              <Text style={styles.listItem}>{invite.name}</Text>
              <IconButton style={styles.acceptButton} icon="account-plus" onPress={() => {
                mutateFunction({
                  variables: {
                    familyId: invite._id,
                    accept: true,
                  },
                })
              }} />
            </View>
          ))}
        </ScrollView>
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
  listItem: {
    fontSize: 20,
  },
  pressableRow: {
    width: 300,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "limegreen",
    borderRadius: 5,
    width: 35,
    height: 35,
  },
})
