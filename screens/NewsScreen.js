import React from 'react';
import { View, Text, Button, ScrollView, FlatList, RefreshControl } from 'react-native';
import { Card } from '../components/common';
import { NewsCard } from '../components/news';
import axios from 'axios';
import ErrorHandler from '../services/ErrorHandler'

class NewsScreen extends React.Component {

  state = {
    posts: [],
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "News",
      headerRight: (
        <Button title='Click me' onPress={ () => { navigation.navigate('NewsDetailScreen') }} />
        )
    }
  }

  componentDidMount() {
    _this = this
    axios.get("http://members-apis.herokuapp.com/api/v1/posts")
      .then((response) => {
        json = response.data

        if (json.status != 200) { return ErrorHandler.handleApiError(json); }

        _this.setState({
          posts: json.data
        })

      })
  }

  _onRefresh = () => {
    this.setState({refreshing: true});

    setTimeout(() => {
      this.setState({refreshing: false});
    }, 3000)
  }

  render() {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={ this.state.refreshing }
            onRefresh={ this._onRefresh }
          />
        }

        data={this.state.posts}
        renderItem={ ({ item }) => <NewsCard post={ item } /> }
        keyExtractor={ (item, index) => item.id.toString() }
      />
    );
  }
}

export default NewsScreen;
