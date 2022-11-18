import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home, Family, ShoppingList, Profile } from './screens'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function MainApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='Family'
        component={Family}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='ShoppingList'
        component={ShoppingList}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name='Profile'
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MainApp'
        component={MainApp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Router
