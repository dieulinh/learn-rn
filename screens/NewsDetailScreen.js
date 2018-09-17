import React from 'react';
import { View, Text } from 'react-native';
import { NewsCard, NewsCardDetail } from '../components/news';

class NewsDetailScreen extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: "News detail"
    }
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", {});

    return (
      <View>
        <NewsCardDetail post={item} />
      </View>
    );
  }

}

export default NewsDetailScreen;
