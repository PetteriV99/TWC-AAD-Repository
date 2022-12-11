import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Checkbox, Paragraph, Title } from 'react-native-paper'

export default function Profile({ navigation }: any) {
  return (
    <View>
      <Card>
        <Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          {/* <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions> */}
          <Title>Käyttäjän nimi</Title>
          <Paragraph>Sähköposti</Paragraph>
        </Card.Content>
      </Card>

      <Button
        onPress={() => navigation.navigate('EditProfile')}
        mode='contained'
      >
        Edit profile
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
