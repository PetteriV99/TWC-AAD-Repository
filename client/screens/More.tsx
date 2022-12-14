import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
} from 'react-native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function More({ navigation }: any) {
  const signOut = () => {
    AsyncStorage.removeItem('AUTH_KEY').then(navigation.navigate('Login'))
  }

  return (
    <ImageBackground
      source={require('../assets/settings_back.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.container}>
        <Button
          onPress={() => navigation.navigate('Profile')}
          mode='contained'
          style={styles.button}
        >
          Profile
        </Button>
        <Button
          onPress={() => navigation.navigate('Settings')}
          mode='contained'
          style={styles.button}
        >
          Settings
        </Button>
        <View style={styles.bottom}>
          <Button onPress={signOut} mode='contained' style={styles.button}>
            Log out
          </Button>
        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    padding: 10,
    margin: 10,
    // backgroundColor: 'rgba(255, 255, 200, 0.95)',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
  button: {
    padding: 5,
    margin: 5,
    marginTop: 20,
  },
  text: {
    padding: 10,
    margin: 10,
    textAlign: 'left',
    fontSize: 18,
  },
})
