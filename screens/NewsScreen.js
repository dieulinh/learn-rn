import React from 'react';
import { View, Text, ScrollView, FlatList, RefreshControl, Button } from 'react-native';
import { Card } from '../components/common';
import { NewsCard } from '../components/news';
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
      title: "News",
      headerRight: (
        <Button title='Click me' onPress={ () => { navigation.navigate('NewsDetailScreen') }} />
        )
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
          renderItem={ ({ item }) => <NewsCard post={ item } /> }
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
