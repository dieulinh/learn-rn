import React from 'react';
import { View, Text, Button } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import BaseApi from '../apis/BaseApi';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile"
    }
  }

  onLogoutPressed = () => {

  }

  renderLogoutButton = () => {
    return (
      <Button title='Logout' onPress={ this.onLogoutPressed } />
    )
  }
  render() {

    return (
      <View style={{flex: 1}}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            xlarge
            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg"}}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />

          <Text style={styles.userName}>Nhan Nguyen</Text>
          <Text style={styles.title}>Software Engineer</Text>
        </View>
        <View style={styles.rowIconContainer}>
          <Icon containerStyle={styles.icon} size={15} name='email' />
          <Text>jerryc.nguyen91@gmail.com</Text>
        </View>
        <View style={styles.rowIconContainer}>
          <Icon containerStyle={styles.icon} size={15} name='map' />
          <Text>123 Hoa Bang</Text>
        </View>
        {this.renderLogoutButton()}
      </View>
    )
  }
}

const styles = {
  avatarContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5
  },
  title: {
    color: '#999'
  },
  rowIconContainer: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10
  },
  icon: {
    marginRight: 10
  }
}

export default ProfileScreen;
