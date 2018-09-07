import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';


class AuthScreen extends React.Component {

  componentDidMount() {

    let _this = this;

    this.props.getCurrentUserInfo().then((response) => {
      console.log("this.props.current_user", this.props.current_user);
      if (this.props.current_user) {
        this.props.navigation.navigate("News");
      } else {
        this.props.facebookLogin();
      }

    })


    // AsyncStorage.removeItem("app_token");
  }


  render() {
    return (
      <View>
        <Text>Hello AuthScreen</Text>
      </View>
    )
  }

}

const mapStateToProp = ({auth}) => {
  console.log("mapStateToProp", auth);
  return {
    current_user: auth.current_user
  }
}

export default connect(mapStateToProp, actions)(AuthScreen);
