import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import AppRoutes from './Routes';
import store from './store';

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
