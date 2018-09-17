import React from 'react';
import {
  View, Text, FlatList, RefreshControl,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import  * as actions from '../actions';

import { List, ListItem, Avatar, Icon, ButtonGroup } from 'react-native-elements';
import Search from 'react-native-search-box';

class ContactsScreen extends React.Component {
  prevFilter = null;

  state = {
    refreshing: false,
    selectedTabIndex: 0
  };

  searchingText = ""

  static navigationOptions = ({navigation}) => {
    return {
      title: "Contacts",
      headerRight: (
        <Icon name={'filter'} type='font-awesome' onPress={() => navigation.navigate("ModalContactFilter", { handleFilter: navigation.state.params.handleFilter })} />
      )
    }
  }

  handleFilter = (filterParams) => {
    this.props.getUsers({page: 1, type: this.selectedListType(), filter: filterParams}, () => {
      this.setState({refreshing: false, is_end: false});
    });
  }

  selectedListType = () => {
    return this.state.selectedTabIndex == 0 ? "personal" : "company";
  }

  updateIndex = (selectedTabIndex) => {
    this.setState({ selectedTabIndex }, () => {
      this.props.getUsers({
        page: 1,
        per_page: 10,
        type: this.selectedListType()
      });
    });
  }

  componentDidMount() {
    this.props.getUsers({page: 1, per_page: 10});
    this.props.navigation.setParams({ handleFilter: this.handleFilter });
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    let page = 1;

    this.props.getUsers({
      page: page,
      per_page: 10,
      keyword: this.searchingText,
      type: this.selectedListType()
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
      per_page: 10,
      type: this.selectedListType()
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
      keyword: text,
      type: this.selectedListType()
    })
  }

  render() {
    const { refreshing, selectedTabIndex } = this.state;

    const component1 = () => <Text>Personal</Text>
    const component2 = () => <Text>Company</Text>
    const buttons = [{ element: component1 }, { element: component2 }]

    return (
      <View>

        <List containerStyle={{marginTop: 0}}>
          <View>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedTabIndex}
              buttons={buttons}
              containerStyle={{height: 35}} />
          </View>

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
  return {
    ...user,
    filter
  }
}

export default connect(mapStateToProps, actions)(ContactsScreen);
