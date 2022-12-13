import { StyleSheet, ScrollView, View, Text } from 'react-native'
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
        <View style={styles.container}>
            <Button
                onPress={() => navigation.navigate('Profile')}
                mode='contained'
                style={styles.button}
            >
                Profile
            </Button>
            <Button
                onPress={() => navigation.navigate('Profile')}
                mode='contained'
                style={styles.button}
            >
                Settings
            </Button>
            <View style={styles.bottom}>
                <Button
                    onPress={signOut}
                    mode='contained'
                    style={styles.button}
                >
                    Log out
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: 'column',
        padding: 10,
        margin: 10,
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    button: {
        padding: 5,
        margin: 5,
        marginTop: 20
    },
    text: {
        padding: 10, margin: 10, textAlign: 'left', fontSize: 18
    }
})