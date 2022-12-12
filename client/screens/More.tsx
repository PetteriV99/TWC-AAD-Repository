import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function More({ navigation }: any) {

    const signOut = () => {
        AsyncStorage.removeItem('AUTH_KEY').then(
            navigation.navigate('Login')
            // Add reseting Apollo Client Store
        );
    };

    return (
        <View>
            <Button
                onPress={() => navigation.navigate('Profile')}
                mode='contained'
            >
                My Profile
            </Button>
            <Button
                onPress={signOut}
                mode='contained'
            >
                Log out
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})