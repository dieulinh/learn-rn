import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import BaseApi from '../apis/BaseApi';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Profile"
    }
  }

  onLogoutPressed = async () => {
    await AsyncStorage.removeItem("app_token");
    this.props.navigation.navigate("Auth");
  }

  renderLogoutButton = () => {
    return (
      <Button title='Logout' onPress={ this.onLogoutPressed } />
    )
  }
  render() {
    const currentUser = BaseApi.currentUser;

    console.log("currentUser", currentUser)
    return (
      <View style={{flex: 1}}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            xlarge
            source={{uri: currentUser.avatar_url}}
            activeOpacity={0.7}
          />

          <Text style={styles.userName}>{currentUser.name}</Text>
          <Text style={styles.title}>{currentUser.job_title}</Text>
        </View>
        <View style={styles.rowIconContainer}>
          <Icon containerStyle={styles.icon} size={15} name='ios-mail' type='ionicon' />
          <Text>{currentUser.email}</Text>
        </View>
        <View style={styles.rowIconContainer}>
          <Icon containerStyle={styles.icon} size={15} name='md-map' type='ionicon' />
          <Text>{currentUser.formatted_address}</Text>
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
