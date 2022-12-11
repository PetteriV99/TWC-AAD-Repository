import { StyleSheet, View } from 'react-native'
import { Button, DataTable, Text } from 'react-native-paper'
import * as React from 'react'

export default function List({
  title,
  headers,
  items,
  listType,
}: {
  title: string
  headers: { id: number; title: string }[]
  items: {
    id: number
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
            onPress={() => console.log('open edit screen')}
          >
            <DataTable.Cell>{i.name}</DataTable.Cell>
            {listType === 'shopping' && (
              <>
                <DataTable.Cell>
                  {/* <Checkbox status={i.collected ? 'checked' : 'unchecked'} /> */}
                  {i.collected} / {i.quantity}
                </DataTable.Cell>
              </>
            )}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  )
}
