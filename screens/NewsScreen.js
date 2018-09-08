import React from 'react';

import {
  View, Text, ScrollView, FlatList, RefreshControl,
  Button, TouchableOpacity
} from 'react-native';

import { Card } from '../components/common';
import { NewsCard, NewsCardDetail } from '../components/news';
import axios from 'axios';
import { connect } from 'react-redux';

import ErrorHandler from '../services/ErrorHandler'
import { Button as RNEButton } from 'react-native-elements';
import * as actions from '../actions';

class NewsScreen extends React.Component {

  loading = false;

  state = {
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "News"
    }
  }

  componentDidMount() {
    this.props.getPosts({page: 1});
  }

  handleRefresh = () => {
    this.setState({refreshing: true});

    this.props.getPosts({page: 1}, () => {
      this.setState({refreshing: false, is_end: false});
    });
  }

  handleLoadMore = () => {
    if (this.loading || this.props.is_end) { return; }

    let page = this.props.page;
    page += 1;

    this.props.getPosts({page: page}, () => {
     this.setState({refreshing: false});
    });

  }

  onCardItemPressed = (item) => {
    this.props.navigation.navigate('NewsDetailScreen', {
      item: item
    })
  }

  renderCardItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={ this.onCardItemPressed.bind(this, item) }>
        <NewsCard post={ item } />
      </TouchableOpacity>
    );
  }

  render() {
    const { refreshing } = this.state;

    return (
      <View>

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={ this.state.refreshing }
            />
          }

          data={this.props.posts}
          renderItem={ this.renderCardItem }
          keyExtractor={ (item, index) => item.id.toString() }
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          scrollEventThrottle={200}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ post }) => {
  return {...post};
}

export default connect(mapStateToProps, actions)(NewsScreen);
