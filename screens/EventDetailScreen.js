import React from 'react';
import { View } from 'react-native';
import { EventItemDetail } from '../components/events';

class EventDetailScreen extends React.Component {

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", {});

    console.log("itemitem", item);

    return (
      <View>
        <EventItemDetail event={item}/>
      </View>
    );
  }

}

export default EventDetailScreen;
