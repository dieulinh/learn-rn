import React from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { UserItem } from '../components/contacts'
import { Card } from '../components/common'
import axios from 'axios';
import ErrorHandler from '../services/ErrorHandler'

class ContactsPersonalScreen extends React.Component {
  loading = false;

  state = {
    contacts: [],
    refreshing: false,
    page: 1,
    per_page: 10,
    is_end: false
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: "People"
    }
  }

  componentDidMount() {
    this._loadContacts({page: 1});
  }

  _loadContacts = (params, callback) => {

    let _this = this;
    _this.loading = true;

    let page = params.page || this.state.page;
    let { contacts, is_end } = this.state;

    params.per_page = this.state.per_page;

    //http://members-apis.herokuapp.com
    axios.get("http://192.168.1.4:3000/api/v1/users", {
      params: params
    }).then((response) => {
        _this.loading = false;

        json = response.data

        if (json.status != 200) { return ErrorHandler.handleApiError(json); }

        // append next page data
        contacts = params.page == 1 ? json.data : [...contacts, ...json.data]

        // mark ended
        is_end = json.data && (json.data.length == 0 || json.data.length < this.state.per_page)

        // rerender lists
        _this.setState({
          contacts: contacts,
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

    this._loadContacts({
      page: page
    }, () => {
      this.setState({refreshing: false, is_end: false});
    })
  }

  handleLoadMore = () => {
    if (this.loading || this.state.is_end) { return; }

    let page = this.state.page;
    page += 1;

    this._loadContacts({
      page: page
    }, () => {
      this.setState({refreshing: false});
      console.log("handleLoadMore Loaded!!!!");
    })

  }

  render() {
    const { contacts, refreshing } = this.state;

    return (
      <View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={ this.state.refreshing }
            />
          }

          data={contacts}
          renderItem={ ({ item }) => <Card><UserItem user={ item } /></Card> }
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

export default ContactsPersonalScreen;
