import React from 'react';
import { View, Text } from 'react-native';
import { UserItem } from '../components/contacts'
import { Card } from '../components/common'

class ContactsCompanyScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "Companies"
    }
  }

  render() {
    return (
      <View>
        <Card><Text>ContactsCompanyScreen screen</Text></Card>
      </View>
    )
  }

}

export default ContactsCompanyScreen;
