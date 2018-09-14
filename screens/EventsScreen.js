import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

class EventsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Events",
      headerRight: (
        <Icon name={'filter'} type='font-awesome' onPress={ () => navigation.navigate("EventFilterModal", { handleFilter: navigation.state.params.handleFilter }) }/>
      )
    }
  }

  handleFilter = (filterParams) => {
    console.log("perform handleFilter", filterParams);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleFilter: this.handleFilter });
  }

  render() {
    return (
      <View>
        <Text>Hello EventsScreen</Text>
      </View>
    )
  }
}

export default EventsScreen;
