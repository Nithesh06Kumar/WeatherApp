import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home';
import RecentSearch from '../screens/RecentSearch';
import Favourite from '../screens/Favourite';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: '#000',
        drawerLabelStyle: {
          marginLeft: 20,
          fontSize: 14,
          fontFamily: 'Roboto-Regular',
          fontWeight: Platform.OS === 'ios' ? '100' : null,
        },
        drawerInactiveTintColor: '#707070',
      }}>
      <Drawer.Screen name="Home" component={Home} />

      <Drawer.Screen name="Favourite" component={Favourite} />

      <Drawer.Screen name="Recent Search" component={RecentSearch} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
