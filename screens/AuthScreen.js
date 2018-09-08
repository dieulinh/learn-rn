import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button as RNEButton } from 'react-native-elements';

class AuthScreen extends React.Component {

  componentDidMount() {

    let _this = this;

    this.props.getCurrentUserInfo().then(() => {
      if (this.props.current_user) {
        this.props.navigation.navigate("News");
      }

    })

    // AsyncStorage.removeItem("app_token");
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.current_user) {
      this.props.navigation.navigate("News");
    }
  }

  onFacebookButtonPress = () => {
    this.props.facebookLogin();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Demo RN App</Text>
        <RNEButton onPress={this.onFacebookButtonPress} style={styles.buttonFacebook} {...styles.buttonFacebookProps} title='Login via Facebook' icon={{name: 'facebook', type: 'font-awesome'}} />
        <Text>with ❤️ by Nhan Nguyen</Text>
      </View>
    )
  }

}

const mapStateToProps = ({ auth }) => {
  return {
    current_user: auth.current_user
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  logo: {
    fontSize: 40
  },
  buttonFacebook: {
    width: 260
  },
  buttonFacebookProps: {
    backgroundColor: "#3C5B96",
    rounded: true
  }
}
export default connect(mapStateToProps, actions)(AuthScreen);
