import React from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Search from 'react-native-search-box';
import { List, ListItem, Avatar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EventsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Events",
      headerRight: (
        <Icon name={'filter'} type='font-awesome' onPress={ () => navigation.navigate("EventFilterModal", { handleFilter: navigation.state.params.handleFilter }) }/>
      )
    }
  }

  state = {
    refreshing: false
  };

  searchingText = ""

  handleFilter = (filterParams) => {
    console.log("perform handleFilter", filterParams);
  }

  componentDidMount() {
    this.props.getEvents({page: 1, per_page: 10});

    this.props.navigation.setParams({ handleFilter: this.handleFilter });
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    let page = 1;

    this.props.getEvents({
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

    this.props.getEvents({
      page: page,
      per_page: 10
    }, () => {
      this.setState({refreshing: false});
    })

  }

  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={ this.onItemPressed.bind(this, item) }>
        <ListItem
          avatar={<Avatar
                  source={item.thumb_url && {uri: item.thumb_url}}
                  title={item.title}
                />}
          title={item.title}
        />
      </TouchableOpacity>
    );
  }

  onSearch = (text) => {
    this.searchingText = text;

    this.props.getEvents({
      page: 1,
      per_page: 10,
      keyword: text
    })
  }

  onItemPressed = (item) => {
    this.props.navigation.navigate('EventDetail', {
      item: item
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

            data={this.props.events}
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

const mapStateToProps = (state) => {
  console.log("mapStateToProps EventsScreen", state.event);
  return {
    ...state.event
  }
}

export default connect(mapStateToProps, actions)(EventsScreen);
