import React from 'react';
import { Image, View } from 'react-native';

const EventItemDetail = ({event}) => {
  return (
    <View>
      <Image source={{uri: event.thumb_url}} style={{width: 100, height: 50}} />
    </View>
  )
}

export { EventItemDetail };