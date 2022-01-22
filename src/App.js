import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './navigation/StackNavigation';
import ContextProvider from './context/ContextProvider';

const App = () => {
  return (
    <ContextProvider>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
