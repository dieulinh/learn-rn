import React from 'react'
import { Text, View, Image, Dimensions } from 'react-native'

let userAvatar = 'http://lorempixel.com/50/50/cats/'
let companyAvatar = 'http://lorempixel.com/50/50/people/'

const UserItem = ({user}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.userAvatar} source={{uri: user.avatar_url }} />

      <View>
        <Text>{user.name}</Text>
        <View style={styles.companyContainer}>
          <Image style={styles.companyAvatar} source={{uri: user.company_avatar_url }} />
          <Text>{user.company_name}</Text>
        </View>
      </View>
    </View>

  )
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10
  },
  userAvatar: {
    height: 50,
    width: 50,
    marginRight: 10,
    borderRadius: 25
  },
  companyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5
  },
  companyAvatar: {
    height: 20,
    width: 20,
    marginRight: 5,
    borderRadius: 10
  }
}
export { UserItem };
