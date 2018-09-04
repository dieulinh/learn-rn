import React from 'react';
import { View, Text } from 'react-native';
import { UserItem } from '../components/contacts'
import { Card } from '../components/common'

class ContactsPersonalScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: "People"
    }
  }

  render() {
    return (
      <View>
        <Card><UserItem /></Card>
        <Card><UserItem /></Card>
        <Card><UserItem /></Card>
      </View>
    )
  }

}

export default ContactsPersonalScreen;
