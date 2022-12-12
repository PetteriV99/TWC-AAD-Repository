import { StyleSheet, View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthLoading({ navigation }: any) {

  const checkLoginState = async () => {
      const userToken = await AsyncStorage.getItem('AUTH_KEY')
      if (userToken === null) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
        navigation.navigate('Login')
      }
      else {navigation.navigate('MainApp')}
  }

  React.useEffect(() => {
    checkLoginState();
  });

  return (
    <View style={{ marginTop: 50, padding: 20 }}>
      <Text>
        Loading
      </Text>
    </View>
  )
}