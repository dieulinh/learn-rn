import React from 'react';
import { View, Text, Button } from 'react-native';
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
      <View>
        <Text>Hello NewsScreen</Text>
        <Card />
        <NewsCard />
      </View>
    );
  }

}

export default NewsScreen;
