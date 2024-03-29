import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Home,
  Family,
  ShoppingList,
  Profile,
  Login,
  EditProfile,
  Register,
  More,
  AuthLoading,
  Settings
} from './screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Appbar, Button, Divider, Menu } from 'react-native-paper'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EditFamily from './screens/EditFamily'
import InviteToFamily from './screens/Invites'
import CreateInvite from './screens/CreateInvite'
import CreateFamily from './screens/CreateFamily'
import CreateShopList from './screens/ShoppingList/CreateShopList'
import EditShopListDetails from './screens/ShoppingList/EditShopListDetails'
import DeleteShopList from './screens/ShoppingList/DeleteShopList'
import CreateNewItem from './screens/ShoppingList/CreateNewItem'

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Family'
        component={Family}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='family-tree'
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Shopping Lists'
        component={ShoppingList}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='shopping' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='More'
        component={More}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='menu'
              size={24}
              color={color}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name='Login'
        component={Login}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='human-greeting-variant'
              size={24}
              color={color}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  )
}

const Router = () => {
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

  return (
    <Stack.Navigator
      initialRouteName='AuthLoading'
      screenOptions={{
        header: props => (
          <Appbar.Header>
              {props.back && (props.route.name !== 'Login') && (props.route.name !== 'MainApp') && (
              <Appbar.BackAction onPress={props.navigation.goBack} />
            )}
            <Appbar.Content title='Family Shopping List App' />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name="AuthLoading" component={AuthLoading}/>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='MainApp' component={MainApp} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Settings' component={Settings} />

      <Stack.Screen name='EditProfile' component={EditProfile} />
      <Stack.Screen name='EditFamily' component={EditFamily} />
      <Stack.Screen name='Invites' component={InviteToFamily} />
      <Stack.Screen name='CreateInvite' component={CreateInvite} />
      <Stack.Screen name='CreateFamily' component={CreateFamily} />

      <Stack.Screen name='CreateShopList' component={CreateShopList} />
      <Stack.Screen name='DeleteShopList' component={DeleteShopList} />
      <Stack.Screen name='EditShopListDetails' component={EditShopListDetails} />

      <Stack.Screen name='CreateNewItem' component={CreateNewItem} />
    </Stack.Navigator>
  )
}

export default Router
