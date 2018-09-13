import React from 'react';
import {
  View, Text, FlatList, RefreshControl,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import  * as actions from '../actions';

import { List, ListItem, Avatar, Icon } from 'react-native-elements';
import Search from 'react-native-search-box';

class ContactsPersonalScreen extends React.Component {
  loading = false;

  state = {
    refreshing: false
  };

  searchingText = ""

  static navigationOptions = ({navigation}) => {
    return {
      header: null
    }
  }

  componentDidMount() {
    this.props.getUsers({page: 1, per_page: 10});
  }

  componentDidUpdate(prevProps) {
    const isChanged = this.isFilterChanged(prevProps.filter);

    if (isChanged) {
      this.props.getUsers({page: 1, per_page: 10, filter: this.props.filter});
    }
  }

  isFilterChanged(prevFilter) {
    const currentFilter = this.props.filter;
    if (!prevFilter && currentFilter) { return true; }
    return prevFilter && (prevFilter.gender != currentFilter.gender || prevFilter.age != currentFilter.age)
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    let page = 1;

    this.props.getUsers({
      page: page,
      per_page: 10,
      keyword: this.searchingText
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

  onItemPressed = (item) => {
    this.props.navigation.navigate('UserDetail', {
      user: item
    })
  }

  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={ this.onItemPressed.bind(this, item) }>
        <ListItem
          avatar={<Avatar
                  rounded
                  source={item.avatar_url && {uri: item.avatar_url}}
                  title={item.name}
                />}
          title={item.name}
          subtitle={item.job_title}
        />
      </TouchableOpacity>
    );
  }

  onSearch = (text) => {
    this.searchingText = text;

    this.props.getUsers({
      page: 1,
      per_page: 10,
      keyword: text
    })
  }

  render() {
    const { refreshing } = this.state;

    return (
      <View>

        <List containerStyle={{marginTop: 0}}>
          <View style={{marginBottom: 10}}>
            <Search onChangeText={this.onSearch}/>
          </View>

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
        </List>
      </View>
    )
  }

}

const mapStateToProps = ({user, filter}) => {
  console.log("mapStateToProps ContactsPersonalScreen", filter);

  return {
    ...user,
    ...filter
  }
}

export default connect(mapStateToProps, actions)(ContactsPersonalScreen);
