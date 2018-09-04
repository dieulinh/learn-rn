import React from 'react';
import { View, Text } from 'react-native';

class ContactsCompanyScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Companies"
    }
  }

  render() {
    return (
      <View>
        <Text>Hello ContactsCompanyScreen</Text>
      </View>
    )
  }

}

export default ContactsCompanyScreen;
