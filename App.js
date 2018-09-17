import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  createMaterialTopTabNavigator, createBottomTabNavigator,
  createStackNavigator, createSwitchNavigator
} from 'react-navigation';

import { Provider } from 'react-redux';
import store from './store';

import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import ContactsScreen from './screens/ContactsScreen';
import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import ContactFilterModal from './modals/ContactFilterModal';
import NewsFilterModal from './modals/NewsFilterModal';
import EventsScreen from './screens/EventsScreen';
import EventFilterModal from './modals/EventFilterModal';
import EventDetailScreen from './screens/EventDetailScreen';


const NewsStack = createStackNavigator({
  News: {
    screen: NewsScreen
  },
  NewsDetailScreen: {
    screen: NewsDetailScreen
  },
  NewsFilterModal: {
    screen: NewsFilterModal
  }
}, {
  mode: 'modal',
});

const UserDetailStack = createStackNavigator({
  UserDetail: {
    screen: UserDetailScreen
  }
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen
  }
})

const ContactStack = createStackNavigator({
  Contacts: {
    screen: ContactsScreen
  },
  UserDetailStack: UserDetailStack,
  ModalContactFilter: {
    screen: ContactFilterModal
  }
});

const EventStack = createStackNavigator({
  Events: {
    screen: EventsScreen
  },
  EventDetail: {
    screen: EventDetailScreen
  },
  EventFilterModal: {
    screen: EventFilterModal
  }
})

const AppTabs = createBottomTabNavigator({
  News: NewsStack,
  Contacts: ContactStack,
  Events: EventStack,
  Profile: ProfileStack
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'News') {
          iconName = `home${focused ? '' : ''}`;
        } else if (routeName === 'Contacts') {
          iconName = `contacts${focused ? '' : ''}`;
        } else if (routeName === 'Profile') {
          iconName = `person${focused ? '' : '-outline'}`;
        } else if (routeName === 'Events') {
          iconName = `event${focused ? '' : ''}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#3C5B96',
      inactiveTintColor: 'gray',
    }
});

const AppRoutes = createSwitchNavigator({
  Auth: AuthScreen,
  AppTabs: AppTabs
});

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppRoutes />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

console.log(store.getState());

export default App;
