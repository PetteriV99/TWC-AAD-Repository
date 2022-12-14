import React from 'react'

import { gql, useQuery } from '@apollo/client'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Checkbox, Paragraph, Title } from 'react-native-paper'

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      username
      email
    }
  }
`

export default function Profile({ route, navigation,  }: any) {
  const { data, loading, error, refetch } = useQuery(CURRENT_USER)

  React.useEffect(() => {
    if (route.params?.refetch) {
      refetch()
    }
  }, [route])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error.message}</Text>

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Title>{data.currentUser.username}</Title>
          <Paragraph>{data.currentUser.email}</Paragraph>
        </Card.Content>
      </Card>

      <Button
        onPress={() => navigation.navigate('EditProfile', { refetch: true })}
        mode='contained'
      >
        Edit profile
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
  },
})
