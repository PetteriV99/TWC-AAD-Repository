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
} from './screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Appbar, Button, Divider, Menu } from 'react-native-paper'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        name='ShoppingList'
        component={ShoppingList}
        options={{
          headerShown: false,

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='menu' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{
          headerShown: false,

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
      initialRouteName='Login'
      screenOptions={{
        header: props => (
          <Appbar.Header>
            {props.back && props.route.name !== 'MainApp' && (
              <Appbar.BackAction onPress={props.navigation.goBack} />
            )}
            <Appbar.Content title='Family Shopping List App' />

            {props.route.name !== 'Login' && (
              <Button
                icon='logout'
                mode='contained'
                onPress={() => {
                  props.navigation.navigate('Login')
                }}
              >
                Log out
              </Button>
            )}
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name='MainApp' component={MainApp} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
    </Stack.Navigator>
  )
}

export default Router
