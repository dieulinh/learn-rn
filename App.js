import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';

import WelcomeScreen from './screens/WelcomeScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import ContactsPersonalScreen from './screens/ContactsPersonalScreen';
import ContactsCompanyScreen from './screens/ContactsCompanyScreen';
import AuthScreen from './screens/AuthScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserDetailScreen from './screens/UserDetailScreen';

const NewsStack = createStackNavigator({
  News: {
    screen: NewsScreen
  },
  NewsDetailScreen: {
    screen: NewsDetailScreen
  }
})

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

const ContactsPersonalStack = createStackNavigator({
  Personal: ContactsPersonalScreen
})

const ContactTabs = createMaterialTopTabNavigator({
  Personal: {
    screen: ContactsPersonalStack
  },
  Company: ContactsCompanyScreen
})

const ContactStack = createStackNavigator({
  ContactTabs: ContactTabs,
  UserDetailStack: UserDetailStack
}, {
  navigationOptions: {
    title: "Contacts"
  }
})

const AppTabs = createBottomTabNavigator({
  News: NewsStack,
  Contacts: ContactStack,
  Profile: ProfileStack
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
