import { StyleSheet, View } from 'react-native'
import { Button, Checkbox, DataTable, Text } from 'react-native-paper'
import * as React from 'react'

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
    <View
      style={{
        marginVertical: 15,
        backgroundColor: 'rgba(255, 255, 200, 0.95)',
        borderRadius: 15,
      }}
    >
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
            key={i.name}
            onPress={() => {
              listType === 'lists' &&
                navigation.navigate('Home', { refetch: true, listId: i.id })

              listType === 'shopping' && setFunc !== undefined && setFunc(i)
            }}
          >
            <DataTable.Cell>{`${i.quantity ? `${i.quantity}x ` : ''}${
              i.name
            }`}</DataTable.Cell>
            {listType === 'family' && (
              <>
                <DataTable.Cell>
                  <Button
                    onPress={() =>
                      navigation.navigate('EditFamily', { familyId: i.id })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onPress={() =>
                      navigation.navigate('CreateInvite', { familyId: i.id })
                    }
                  >
                    Invite
                  </Button>
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
                  <Button
                    onPress={() =>
                      navigation.navigate('EditShopListDetails', {
                        shoplistId: i.id,
                      })
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onPress={() =>
                      navigation.navigate('DeleteShopList', {
                        familyId: i.familyId,
                        shoplistId: i.id,
                      })
                    }
                  >
                    Delete
                  </Button>
                </DataTable.Cell>
              </>
            )}
          </DataTable.Row>
        ))}
      </DataTable>
    </View>
  )
}
