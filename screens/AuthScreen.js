import React from 'react';
import { View, Text } from 'react-native';

class AuthScreen extends React.Component {

  componentDidMount() {
    this.props.navigation.navigate("Main")
  }

  render() {
    return (
      <View>
        <Text>Hello AuthScreen</Text>
      </View>
    )
  }

}

export default AuthScreen;
