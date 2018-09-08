import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { UserItem } from '../components/contacts'
import { Card } from '../components/common'
import axios from 'axios';
import ErrorHandler from '../services/ErrorHandler'
import { connect } from 'react-redux';
import  * as actions from '../actions';

class ContactsPersonalScreen extends React.Component {
  loading = false;

  state = {
    refreshing: false
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: "People"
    }
  }

  componentDidMount() {
    this.props.getUsers({page: 1, per_page: 10});
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    let page = 1;

    this.props.getUsers({
      page: page,
      per_page: 10
    }, () => {
      this.setState({refreshing: false, is_end: false});
    })
  }

  handleLoadMore = () => {
    if (this.loading || this.props.is_end) { return; }

    let page = this.props.page;
    page += 1;

    this.props.getUsers({
      page: page,
      per_page: 10
    }, () => {
      this.setState({refreshing: false});
    })

  }

  renderListItem = ({ item }) => {
    return (
      <Card><UserItem user={ item } /></Card>
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

          data={this.props.users}
          renderItem={ this.renderListItem }
          keyExtractor={ (item, index) => item.id.toString() }
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          scrollEventThrottle={200}
        />
      </View>
    )
  }

}

const mapStateToProps = ({user}) => {
  return {
    ...user
  }
}

export default connect(mapStateToProps, actions)(ContactsPersonalScreen);
