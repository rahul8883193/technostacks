import React from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import { Provider } from "react-redux";
import store from './src/Reducers/store';
import AppAuthNavigation from './src/Navigation/AppAuthNavigation';




function App() {
  return (
    <Provider store={store}>
      <AppAuthNavigation/>
    </Provider>
  );
};

export default App;
