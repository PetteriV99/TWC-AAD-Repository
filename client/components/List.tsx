import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { Button, DataTable } from 'react-native-paper'
import * as React from 'react'

export default function List({
  headers,
  items,
  listType,
}: {
  headers: { id: number; title: string }[]
  items: { id: number; name: string; quantity?: number; collected?: number }[]
  listType: 'family' | 'shopping' | 'lists'
}) {
  return (
    <DataTable>
      <DataTable.Header>
        {headers.map(h => (
          <DataTable.Title key={h.id}>{h.title}</DataTable.Title>
        ))}
      </DataTable.Header>

      {items.map(i => (
        <DataTable.Row
          key={i.id}
          onPress={() => console.log('open edit screen')}
        >
          <DataTable.Cell>{i.name}</DataTable.Cell>
          {listType === 'shopping' && (
            <>
              <DataTable.Cell>{i.quantity}</DataTable.Cell>
              <DataTable.Cell>
                {/* <Checkbox status={i.collected ? 'checked' : 'unchecked'} /> */}
                {i.collected} / {i.quantity}
              </DataTable.Cell>
            </>
          )}
        </DataTable.Row>
      ))}
    </DataTable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
})
