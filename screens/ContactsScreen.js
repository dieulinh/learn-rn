import React from 'react';
import { View, Text } from 'react-native';

class ContactsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Contacts"
    }
  }

  render() {
    return (
      <View>
        <Text>Hello ContactsScreen</Text>
      </View>
    )
  }

}

export default ContactsScreen;
