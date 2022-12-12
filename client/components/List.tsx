import { StyleSheet, View } from 'react-native'
import { Button, DataTable, Text } from 'react-native-paper'
import * as React from 'react'
import FamilyEditModal from '../screens/FamilyEditModal'
import { ApolloQueryResult } from '@apollo/client'
import FamilyCreateInviteModal from '../screens/FamilyCreateInviteModal'
import EditShoppingList from '../screens/ShoppingList/EditShoppingList'
import DeleteShoppingList from '../screens/ShoppingList/DeleteShoppingList'

export default function List({
  navigation,
  title,
  headers,
  items,
  listType,
}: {
  navigation?: any
  title: string
  headers: { id: number; title: string }[]
  items: {
    id: number | string
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
            onPress={() =>
              listType === 'lists' &&
              navigation.navigate('Home', { listName: i.name })
            }
          >
            <DataTable.Cell>{i.name}</DataTable.Cell>
            {listType === 'family' && (
              <>
                <DataTable.Cell>
                  <FamilyEditModal familyId={String(i.id)} />
                  <FamilyCreateInviteModal familyId={String(i.id)} />
                </DataTable.Cell>
              </>
            )}
            {listType === 'shopping' && (
              <>
                <DataTable.Cell>
                  {/* <Checkbox status={i.collected ? 'checked' : 'unchecked'} /> */}
                  {i.collected} / {i.quantity}
                </DataTable.Cell>
              </>
            )}
            {listType === 'lists' && (
              <>
                <DataTable.Cell>
                  <EditShoppingList
                    familyId={String(i.id)}
                    listName={String(i.name)}
                  />
                  <DeleteShoppingList
                    familyId={String(i.id)}
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
