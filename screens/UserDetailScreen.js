import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import BaseApi from '../apis/BaseApi';

class UserDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    }
  }

  render() {
    const user = this.props.navigation.getParam("user", {});;

    return (
      <View style={{flex: 1}}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            xlarge
            source={{uri: user.avatar_url}}
            activeOpacity={0.7}
          />

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.title}>{user.job_title}</Text>
        </View>
        <View style={styles.rowIconContainer}>
          <Icon containerStyle={styles.icon} size={15} name='ios-mail' type='ionicon' />
          <Text>{user.email}</Text>
        </View>
        <View style={styles.rowIconContainer}>
          <Icon containerStyle={styles.icon} size={15} name='md-map' type='ionicon' />
          <Text>{user.formatted_address}</Text>
        </View>
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

export default UserDetailScreen;
