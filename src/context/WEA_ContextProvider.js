import React, {useState, createContext, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Context = createContext();

const ContextProvider = props => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchedString, setSearchString] = useState('');

  //Method for storing the data in async storage
  const saveToAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      setWeatherData(value);
    } catch (e) {
      console.log(e);
    }
  };

  //Method for getting the keys from the async storage
  const getAllKeysFromAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.length > 0) {
        return keys;
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  };

  //Method for loading the data from the async storage
  const loadFromAsyncStorage = async key => {
    try {
      const history = await AsyncStorage.getItem(key);
      if (history) {
        return history;
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  };

  //Method for getting multiple [key,value] data from async storage
  const getMultipleValuesFromAsyncStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys) {
        const values = await AsyncStorage.multiGet(keys);
        if (values) {
          return values;
        }
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  };

  //Method for replacing the data in async storage
  const replaceToAsyncStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.log(e);
    }
  };

  //Method for removing the data from the async storage
  const removeItemsFromStorage = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  // const removeValue = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     const value = await loadFromAsyncStorage('canada');
  //     // await AsyncStorage.multiRemove(keys);
  //     console.log('Keyssssss', keys);
  //     console.log('Keyssssss', JSON.parse(value));
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   console.log('Done.');
  // };
  // useEffect(() => {
  //   // console.log('Deleted');
  //   removeValue();
  // }, []);

  return (
    <Context.Provider
      value={{
        weatherData,
        setWeatherData,
        saveToAsyncStorage,
        loadFromAsyncStorage,
        getMultipleValuesFromAsyncStorage,
        searchedString,
        setSearchString,
        replaceToAsyncStorage,
        removeItemsFromStorage,
        getAllKeysFromAsyncStorage,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;

const styles = StyleSheet.create({});
