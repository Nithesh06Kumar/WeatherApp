import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {Context} from '../../context/WEA_ContextProvider';
import {useWindowDimensions} from 'react-native';

const WEA_WeatherIcon = () => {
  const {weatherData} = useContext(Context);
  const {height, width} = useWindowDimensions();
  let portrait = height > width;
  return (
    <View style={portrait ? styles.iconWrapper : styles.landscapeIconWrapper}>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`,
        }}
        style={portrait ? styles.weatherIcon : styles.landscapeWeatherIcon}
      />
    </View>
  );
};

export default WEA_WeatherIcon;

const styles = StyleSheet.create({
  iconWrapper: {
    height: '29%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
    paddingTop: 20,
    flex: 2,
  },
  weatherIcon: {
    bottom: -15,
    width: 160,
    height: 150,
  },
  landscapeIconWrapper: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,

    flex: 4.3,
  },
  landscapeWeatherIcon: {
    width: 120,
    height: 100,
  },
});
