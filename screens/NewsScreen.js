import React from 'react';

import {
  View, FlatList, RefreshControl, TouchableOpacity
} from 'react-native';

import { NewsCard } from '../components/news';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Icon } from 'react-native-elements';

class NewsScreen extends React.Component {

  loading = false;

  state = {
    refreshing: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "News",
      headerRight: (
        <Icon name={'filter'} type='font-awesome' onPress={ () => navigation.navigate("NewsFilterModal", { handleFilter: navigation.state.params.handleFilter }) }/>
      )
    }
  }

  handleFilter = (filterParams) => {
    this.props.getPosts({page: 1, filter: filterParams}, () => {
      this.setState({refreshing: false, is_end: false});
    });
  }

  componentDidMount() {
    this.props.getPosts({page: 1});

    this.props.navigation.setParams({ handleFilter: this.handleFilter });
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
          onEndReachedThreshold={0.1}
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
