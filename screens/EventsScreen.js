import React from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import Search from 'react-native-search-box';
import { List, ListItem, Avatar, Icon, ButtonGroup } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class EventsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Events",
      headerRight: (
        <Icon name={'filter'} type='font-awesome' onPress={() => navigation.navigate("EventFilterModal", { handleFilter: navigation.state.params.handleFilter })} />
      )
    }
  }

  state = {
    refreshing: false,
    selectedTabIndex: 0
  };

  searchingText = ""

  handleFilter = (filterParams) => {
    this.props.getEvents({page: 1, filter: filterParams}, () => {
      this.setState({refreshing: false, is_end: false});
    });
  }

  componentDidMount() {
    this.props.getEvents({ page: 1, per_page: 10, type: this.selectedListType() });

    this.props.navigation.setParams({ handleFilter: this.handleFilter });
  }

  selectedListType = () => {
    return this.state.selectedTabIndex == 0 ? "new" : "archived";
  }

  updateIndex = (selectedTabIndex) => {
    this.setState({ selectedTabIndex }, () => {
      this.props.getEvents({
        page: 1,
        per_page: 10,
        type: this.selectedListType()
      });
    });
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    let page = 1;

    this.props.getEvents({
      page: page,
      per_page: 10,
      keyword: this.searchingText,
      type: this.selectedListType()
    }, () => {
      this.setState({ refreshing: false, is_end: false });
    })
  }

  handleLoadMore = () => {
    if (this.loading || this.props.is_end) { return; }

    let page = this.props.page;
    page += 1;

    this.props.getEvents({
      page: page,
      per_page: 10,
      type: this.selectedListType()
    }, () => {
      this.setState({ refreshing: false });
    })

  }

  renderListItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.onItemPressed.bind(this, item)}>
        <ListItem
          avatar={<Avatar
            source={item.thumb_url && { uri: item.thumb_url }}
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
      keyword: text, 
      type: this.selectedListType()
    })
  }

  onItemPressed = (item) => {
    this.props.navigation.navigate('EventDetail', {
      item: item
    })
  }

  render() {
    const { refreshing, selectedTabIndex } = this.state;

    const component1 = () => <Text>New events</Text>
    const component2 = () => <Text>Archived Events</Text>
    const buttons = [{ element: component1 }, { element: component2 }]

    return (
      <View>
        
        <List containerStyle={{ marginTop: 0 }}>
          <View>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedTabIndex}
              buttons={buttons}
              containerStyle={{height: 35}} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Search onChangeText={this.onSearch} />
          </View>

          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
              />
            }

            data={this.props.events}
            renderItem={this.renderListItem}
            keyExtractor={(item, index) => item.id.toString()}
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

// export default EventsScreen;


const mapStateToProps = (state) => {
  return {
    ...state.event
  }
}

export default connect(mapStateToProps, actions)(EventsScreen);
