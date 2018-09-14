import React from 'react';
import { View, Text } from 'react-native';

class EventDetailScreen extends React.Component {

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", {});

    console.log("itemitem", item);

    return (
      <View>
        <Text>{item.title}</Text>
      </View>
    );
  }

}

export default EventDetailScreen;
