import { StyleSheet, View } from 'react-native'
import { Button, Checkbox, DataTable, Text } from 'react-native-paper'
import * as React from 'react'
import FamilyEditModal from '../screens/EditFamily'
import { ApolloQueryResult } from '@apollo/client'
import FamilyCreateInviteModal from '../screens/CreateInvite'
import EditShoppingList from '../screens/ShoppingList/EditShoppingList'
import DeleteShoppingList from '../screens/ShoppingList/DeleteShoppingList'
import AddShoppingListItem from '../screens/ShoppingList/AddShoppingListItem'

export default function List({
  navigation,
  title,
  headers,
  items,
  listType,
  setFunc,
}: {
  navigation?: any
  setFunc?: (arg: any) => void
  title: string
  headers: { id: number; title: string }[]
  items: {
    id: number | string
    familyId?: number
    name: string
    quantity?: number
    collected?: number
  }[]
  listType: 'family' | 'shopping' | 'lists'
}) {
  return (
    <View>
      <Text
        style={{ padding: 10, margin: 10, textAlign: 'center', fontSize: 25 }}
      >
        {title}
      </Text>
      <DataTable>
        <DataTable.Header>
          {headers.map(h => (
            <DataTable.Title key={h.id}>{h.title}</DataTable.Title>
          ))}
        </DataTable.Header>

        {items.map(i => (
          <DataTable.Row
            key={i.id}
            onPress={() => {
              listType === 'lists' &&
                navigation.navigate('Home', { listName: i.name })

              listType === 'shopping' && setFunc !== undefined && setFunc(i)
            }}
          >
            <DataTable.Cell>{i.name}</DataTable.Cell>
            {listType === 'family' && (
              <>
                <DataTable.Cell>
                  <Button onPress={() => navigation.navigate('EditFamily', { familyId: i.id })}>Edit</Button>
                  <Button onPress={() => navigation.navigate('CreateInvite', { familyId: i.id })}>Invite</Button>
                </DataTable.Cell>
              </>
            )}
            {listType === 'shopping' && (
              <>
                <DataTable.Cell>
                  <Checkbox status={i.collected ? 'checked' : 'unchecked'} />
                </DataTable.Cell>
              </>
            )}
            {listType === 'lists' && (
              <>
                <DataTable.Cell>
                  <EditShoppingList
                    familyId={String(i.familyId)}
                    listName={String(i.name)}
                  />
                  <DeleteShoppingList
                    familyId={String(i.familyId)}
                    listName={String(i.name)}
                  />
                </DataTable.Cell>
              </>
            )}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  )
}
