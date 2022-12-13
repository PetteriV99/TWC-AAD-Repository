import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ScrollView } from 'react-native'
import { Divider, Text } from 'react-native-paper'
import * as React from 'react'
import List from '../components/List'
import { gql, useQuery } from '@apollo/client'

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

// TODO: get items from actual shopping list
const testshoplist = [
  { checked: true, name: 'tomat', id: 1 },
  { checked: false, name: 'apels', id: 2 },
]

export default function Home({ route, navigation }: any) {
  const { loading, error, data, refetch } = useQuery(USER_FAMILIES)

  const [checkedList, setCheckedList] = React.useState([...testshoplist])
  const [pressed, setPressed] = React.useState<{
    id: number
    checked: boolean
  }>({ id: 0, checked: true })

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>{error.message}</Text>

  const families = route?.params?.listName ? data.userFamilies : []

  const currentList = route?.params?.listName ?? 'No selected list'
  // const query = useQuery(GET_SHOPLIST, { variables: { id: currentList } })

  React.useEffect(() => {
    const found = checkedList.findIndex(it => it.id === pressed.id)

    if (found !== -1) {
      const newlist = [...checkedList]

      newlist[found] = { ...newlist[found], checked: !newlist[found].checked }

      setCheckedList(newlist)
    }
  }, [pressed])

  return (
    <ScrollView style={styles.container}>
      <List
        title={currentList}
        headers={[
          { id: 1, title: 'Name' },
          { id: 2, title: 'Collected' },
        ]}
        items={checkedList.map((item: any) => ({
          id: item.id,
          name: item.name,
          collected: item.checked,
        }))}
        listType={'shopping'}
        setFunc={setPressed}
      />

      {route?.params?.listName === undefined && (
        <Text style={styles.center}>Please select a list</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  center: {
    flex: 1,
    alignSelf: 'center',
    margin: 20,
    padding: 10,
    justifyContent: 'center',
  },
})
