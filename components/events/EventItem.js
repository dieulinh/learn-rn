import React from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements';

const EventItem = ({ event }) => {
  return (
    <Card title={event.title} image={{uri: event.thumb_url}}>
      <Text>{event.title}</Text>
    </Card>
  )
}

const styles = {
  headerContainer: {
    padding: 10
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  metaItemAuthor: {
    color: 'blue',
    marginRight: 10
  },
  metaItem: {
    marginRight: 10
  }
}

export { EventItem };
 