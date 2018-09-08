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
  },
  Profile: {
    screen: ProfileScreen
  }

});

const AppRoutes = createSwitchNavigator({
  Auth: { screen: AuthScreen },
  AppTabs: { screen: AppTabs }
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
