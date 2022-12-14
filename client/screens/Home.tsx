import { StatusBar } from 'expo-status-bar'
import { StyleSheet, ScrollView, View, ImageBackground } from 'react-native'
import { Button, Divider, Text } from 'react-native-paper'
import * as React from 'react'
import List from '../components/List'
import { gql, useMutation, useQuery } from '@apollo/client'

const SHOPPING_LIST = gql`
  query ShoppingList($id: ID) {
    shoppingList(_id: $id) {
      items {
        name
        quantity
        checked
      }
      name
    }
  }
`

const CHECK_ITEM = gql`
  mutation CheckItemInShoppingList(
    $listId: ID!
    $name: String!
    $checked: Boolean!
  ) {
    checkItemInShoppingList(listId: $listId, name: $name, checked: $checked) {
      _id
    }
  }
`

export default function Home({ route, navigation }: any) {
  const { loading, error, data, refetch } = useQuery(SHOPPING_LIST, {
    variables: { id: route.params?.listId },
  })
  const [mutateFunction] = useMutation(CHECK_ITEM)

  const [pressed, setPressed] = React.useState<{
    name: string
    checked: boolean
  }>({ name: '', checked: true })

  const [selectedListName, setSelectedListName] = React.useState(
    (error && 'Please select a list') || 'Loading...'
  )
  const [selectedListItems, setSelectedListItems] = React.useState<any[]>([])

  React.useEffect(() => {
    setSelectedListItems(
      selectedListItems.map(it => {
        if (it.name === pressed.name) {
          mutateFunction({
            variables: {
              listId: route.params?.listId,
              name: it.name,
              checked: !it.collected,
            },
          })
          return {
            ...it,
            collected: !it.collected,
          }
        }
        return it
      })
    )
  }, [pressed])

  React.useEffect(() => {
    if (!route.params || route.params.refetch) {
      refetch()
      if (route.params) route.params.refetch = false
    }
  }, [route.params])

  React.useEffect(() => {
    if (data && route.params?.listId) {
      setSelectedListName(data.shoppingList.name)
      setSelectedListItems(
        data.shoppingList.items.map((item: any) => ({
          collected: item.checked,
          ...item,
        }))
      )
    } else {
      setSelectedListName('Please select a list')
    }
  }, [data])

  if (loading) return <Text>Loading...</Text>

  return (
    <ImageBackground
      source={require('../assets/home_back.jpg')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <Button
          mode='contained'
          onPress={async () => {
            refetch()
          }}
        >
          Refresh
        </Button>
        <ScrollView>
          <List
            title={selectedListName}
            headers={[
              { id: 1, title: 'Name' },
              { id: 2, title: 'Collected' },
            ]}
            items={selectedListItems.map((item: any) => ({
              key: item.name,
              collected: item.checked,
              ...item,
            }))}
            listType={'shopping'}
            setFunc={setPressed}
          />
        </ScrollView>

        {route.params?.listId && (
          <Button
            mode='contained'
            onPress={() =>
              navigation.navigate('CreateNewItem', {
                listId: route.params?.listId,
              })
            }
          >
            Add new item
          </Button>
        )}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    // backgroundColor: 'rgba(255, 255, 200, 0.95)',
  },
  center: {
    flex: 1,
    alignSelf: 'center',
    margin: 20,
    padding: 10,
    justifyContent: 'center',
  },
})
