import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import NewsScreen from './screens/NewsScreen';
import NewsDetailScreen from './screens/NewsDetailScreen';
import ContactsScreen from './screens/ContactsScreen';
import ContactsPersonalScreen from './screens/ContactsPersonalScreen';
import ContactsCompanyScreen from './screens/ContactsCompanyScreen';
import AuthScreen from './screens/AuthScreen';

const NewsStack = createStackNavigator({
  News: {
    screen: NewsScreen
  },
  NewsDetailScreen: {
    screen: NewsDetailScreen
  }
})

const ContactStack = createStackNavigator({
  Contacts: {
    screen: createMaterialTopTabNavigator({
      Personal: ContactsPersonalScreen,
      Company: ContactsCompanyScreen
    })
  }
}, {
  navigationOptions: {
    title: "Contacts"
  }
})

const AppTabs = createBottomTabNavigator({
  News: {
    screen: NewsStack
  },
  Contacts: {
    screen: ContactStack
  }

});

export default createSwitchNavigator({
  // Auth: { screen: AuthScreen },
  AppTabs: { screen: AppTabs }
});
