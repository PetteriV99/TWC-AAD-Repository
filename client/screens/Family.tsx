import { gql, useQuery } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { Button } from 'react-native-paper'
import CustomModal from '../components/CustomModal'
import List from '../components/List'
import FamilyCreationModal from './CreateFamily'
import FamilyInvitesModal from './Invites'

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

export default function Family({ route, navigation }: { route: any, navigation: any }) {
  const { loading, error, data, refetch } = useQuery(USER_FAMILIES)

  const [families, setFamilies] = React.useState([])

  React.useEffect(() => {
    if (route.params?.refetch) {
      refetch()
      route.params.refetch = false
    }
  }, [route.params?.refetch])

  React.useEffect(() => {
    if (data) {
      setFamilies(data.userFamilies)
    }
  }, [data])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

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
        navigation={navigation}
        title='My families'
        headers={[{ id: 1, title: 'Name' }]}
        items={families.map((family: any) => ({
          id: family._id,
          name: family.name,
        }))}
        listType={'family'}
      />

      <Button style={styles.button } mode='contained' onPress={() => navigation.navigate('Invites')}> Invites </Button>
      <Button style={styles.button } mode='contained' onPress={() => navigation.navigate('CreateFamily')}> Create family </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
  button: {
    margin: 10,
  },
})
