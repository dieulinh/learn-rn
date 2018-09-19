import React from 'react';
import { Image, View , Button } from 'react-native';

const EventItemDetail = ({event}) => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <Image source={{uri: event.thumb_url}} style={{width: 100, height: 50}} />
      <View style={{flexDirection: 'row', height: 40 }}>
        <View style={{flex: 2}}>
          <Button title='Zusagen' onPress={console.log('a')} />
        </View>
        

        <View style={{flex: 2}}>
          <Button title='Absagen' onPress={console.log('b')} />
        </View>
        

      </View>
    </View>
  )
}
const styles = {
  buttonsContainer: {

  }
}

export { EventItemDetail };