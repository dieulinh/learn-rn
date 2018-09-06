import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';


class AuthScreen extends React.Component {

  componentDidMount() {
    this.props.facebookLogin();
    this.props.navigation.navigate("Main");
  }

  render() {
    return (
      <View>
        <Text>Hello AuthScreen</Text>
      </View>
    )
  }

}


export default connect(null, actions)(AuthScreen);
