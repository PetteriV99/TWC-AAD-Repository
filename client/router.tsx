import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  Home,
  Family,
  ShoppingList,
  Profile,
  Login,
  EditProfile,
} from './screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Appbar } from 'react-native-paper'

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Family'
        component={Family}
        options={{
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
        name='ShoppingList'
        component={ShoppingList}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='menu' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='human-greeting-variant'
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
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        header: props => (
          <Appbar.Header>
            {props.back ? (
              <Appbar.BackAction onPress={props.navigation.goBack} />
            ) : null}
            <Appbar.Content title='Family shopping list app' />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name='MainApp' component={MainApp} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
    </Stack.Navigator>
  )
}

export default Router
