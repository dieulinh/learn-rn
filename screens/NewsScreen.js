import React from 'react';
import { View, Text, Button, ScrollView, FlatList, RefreshControl } from 'react-native';
import { Card } from '../components/common';
import { NewsCard } from '../components/news';
import axios from 'axios';
import ErrorHandler from '../services/ErrorHandler'

class NewsScreen extends React.Component {

  loading = false;

  state = {
    posts: [],
    refreshing: false,
    page: 1,
    per_page: 5,
    is_end: false
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
    this._loadNews({page: 1});
  }

  _loadNews = (params, callback) => {

    let _this = this;
    _this.loading = true;

    let page = params.page || this.state.page;
    let { posts, is_end } = this.state;

    params.per_page = this.state.per_page;

    //http://members-apis.herokuapp.com
    axios.get("http://192.168.1.4:3000/api/v1/posts", {
      params: params
    }).then((response) => {
        _this.loading = false;

        json = response.data

        if (json.status != 200) { return ErrorHandler.handleApiError(json); }

        // append next page data
        posts = params.page == 1 ? json.data : [...posts, ...json.data]

        // mark ended
        is_end = json.data && (json.data.length == 0 || json.data.length < this.state.per_page)

        // rerender lists
        _this.setState({
          posts: posts,
          is_end: is_end,
          page: page
        }, () => {

          if (callback) {
            callback()
          }
        })

      })
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    let page = 1;

    this._loadNews({
      page: page
    }, () => {
      this.setState({refreshing: false, is_end: false});
    })
  }

  handleLoadMore = () => {
    if (this.loading || this.state.is_end) { return; }

    let page = this.state.page;
    page += 1;

    this._loadNews({
      page: page
    }, () => {
      this.setState({refreshing: false});
      console.log("handleLoadMore Loaded!!!!");
    })

  }

  render() {
    const { posts, refreshing } = this.state;

    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={ this.state.refreshing }
          />
        }

        data={posts}
        renderItem={ ({ item }) => <NewsCard post={ item } /> }
        keyExtractor={ (item, index) => item.id.toString() }
        refreshing={refreshing}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleLoadMore}
        onEndReachedThreshold={0}
        scrollEventThrottle={200}
      />
    );
  }
}

export default NewsScreen;
