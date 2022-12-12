import { gql, useQuery } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import CustomModal from '../components/CustomModal'
import List from '../components/List'
import FamilyCreationModal from './FamilyCreationModal'
import FamilyInvitesModal from './FamilyInvitesModal'

const USER_FAMILIES = gql`
  query UserFamilies {
    userFamilies(userId: "639059406a914ffbad0f2a49") {
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

export default function Family() {
  const { loading, error, data, refetch } = useQuery(USER_FAMILIES)

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  const families = data.userFamilies

  return (
    <ScrollView style={styles.container}>
      <Button
        mode='contained'
        onPress={async () => {
          refetch()
        }}
      >
        Refresh
      </Button>
      <List
        title='My families'
        headers={[{ id: 1, title: 'Name' }]}
        items={families.map((family: any) => ({
          id: family._id,
          name: family.name,
        }))}
        listType={'family'}
      />

      <FamilyInvitesModal refetchFamilies={refetch} />
      <FamilyCreationModal refetch={refetch} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
})
