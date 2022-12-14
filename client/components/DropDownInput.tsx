import * as React from 'react'
import { View } from 'react-native'
import { Button, Menu, Divider, Provider, List } from 'react-native-paper'

const DropDownInput = ({
  title,
  items,
  setFunc,
  style,
}: {
  title: string
  items: any[]
  setFunc: (arg: any) => any
  style?: any
}) => {
  const [visible, setVisible] = React.useState(false)

  const closeMenu = () => setVisible(false)

  return (
    <List.Accordion
      style={[style, { borderRadius: 20, backgroundColor: 'white' }]}
      theme={{ colors: { background: 'rgba(130, 88, 105, 0)' } }}
      title={title}
      left={props => <List.Icon {...props} icon='family-tree' />}
      expanded={visible}
      onPress={() => setVisible(!visible)}
    >
      {items.map(i => (
        <List.Item
          left={props => <List.Icon {...props} icon='family-tree' />}
          style={{
            backgroundColor: 'rgb(189, 157, 169)',
            borderRadius: 10,
            marginHorizontal: 10,
            marginVertical: 2,
          }}
          title={i.name}
          key={i.id}
          onPress={() => {
            closeMenu()
            setFunc(i)
          }}
        />
      ))}
    </List.Accordion>

    // <Provider>
    //   <View
    //     style={{
    //       borderWidth: 5,
    //       paddingTop: 50,
    //       flexDirection: 'row',
    //       justifyContent: 'center',
    //     }}
    //   >
    //     <Menu
    //       visible={visible}
    //       onDismiss={closeMenu}
    //       anchor={<Button onPress={openMenu}>{title}</Button>}
    //     >
    //       {items.map(i => (
    //         <Menu.Item
    //           key={i.id}
    //           onPress={() => {
    //             closeMenu()
    //             setFunc(i)
    //           }}
    //           title={i.name}
    //         />
    //       ))}
    //     </Menu>
    //   </View>
    // </Provider>
  )
}

export default DropDownInput
