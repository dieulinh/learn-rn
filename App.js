import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import ContactsScreen from './screens/ContactsScreen';
import AuthScreen from './screens/AuthScreen';

const newsTabNavigators = createStackNavigator({
  News: { screen: NewsScreen },
  NewsDetailScreen: { screen: NewsDetailScreen }
})

const mainTabNavigators = createBottomTabNavigator({
  News: { screen: newsTabNavigators },
  Contacts: { screen: ContactsScreen }
});

export default createBottomTabNavigator({
    // Auth: { screen: AuthScreen },
    Main: { screen: mainTabNavigators }
  }, {
    navigationOptions: {
    tabBarVisible: false
  }
});
