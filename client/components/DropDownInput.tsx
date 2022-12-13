import * as React from 'react'
import { View } from 'react-native'
import { Button, Menu, Divider, Provider, List } from 'react-native-paper'

const DropDownInput = ({
  title,
  items,
  setFunc,
}: {
  title: string
  items: any[]
  setFunc: (arg: any) => any
}) => {
  const [visible, setVisible] = React.useState(false)

  const closeMenu = () => setVisible(false)

  return (
    <List.Accordion
      title={title}
      left={props => <List.Icon {...props} icon='family-tree' />}
      expanded={visible}
      onPress={() => setVisible(!visible)}
    >
      {items.map(i => (
        <List.Item
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
