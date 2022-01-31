import {StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/WEA_HomeScreen';
import RecentSearch from '../screens/WEA_RecentSearchScreen';
import Favourite from '../screens/WEA_FavouriteScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation}) => {
  const onPressSearchIcon = () => {
    navigation.navigate('Search');
  };

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
      <Drawer.Screen name="Home">
        {props => <Home {...props} onPressSearchIcon={onPressSearchIcon} />}
      </Drawer.Screen>

      <Drawer.Screen name="Favourite">
        {props => (
          <Favourite {...props} onPressSearchIcon={onPressSearchIcon} />
        )}
      </Drawer.Screen>

      <Drawer.Screen name="RecentSearch">
        {props => (
          <RecentSearch {...props} onPressSearchIcon={onPressSearchIcon} />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
