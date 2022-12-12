import { StyleSheet, Text, View } from 'react-native'
import { Button, Card, Checkbox, Paragraph, Title } from 'react-native-paper'

export default function Profile({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
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
    padding: 10,
    margin: 10,
  },
})
