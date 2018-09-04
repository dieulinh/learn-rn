import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import ContactsScreen from './screens/ContactsScreen';
import AuthScreen from './screens/AuthScreen';

const NewsStack = createStackNavigator({
  News: { screen: NewsScreen },
  NewsDetailScreen: { screen: NewsDetailScreen }
})

const AppTabs = createBottomTabNavigator({
  News: { screen: NewsStack },
  Contacts: { screen: ContactsScreen }
});

export default createSwitchNavigator({
  // Auth: { screen: AuthScreen },
  AppTabs: { screen: AppTabs }
});
