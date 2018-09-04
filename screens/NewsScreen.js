import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import { Card } from '../components/common';
import { NewsCard } from '../components/news';

class NewsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "News",
      headerRight: (
        <Button title='Click me' onPress={ () => { navigation.navigate('NewsDetailScreen') }} />
        )
    }
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </ScrollView>
    );
  }
}

export default NewsScreen;
