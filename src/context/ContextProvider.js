import React, {useState, createContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Context = createContext();

const ContextProvider = props => {
  const [weatherData, setWeatherData] = useState(null);

  return (
    <Context.Provider
      value={{
        weatherData,
        setWeatherData,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;

const styles = StyleSheet.create({});
