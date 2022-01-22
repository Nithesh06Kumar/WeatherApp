import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {Context} from '../../context/ContextProvider';

const WeatherIcon = () => {
  const {weatherData} = useContext(Context);
  console.log('weatherIcon');
  return (
    <View style={styles.iconWrapper}>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`,
        }}
        style={styles.weatherIcon}
      />
    </View>
  );
};

export default WeatherIcon;

const styles = StyleSheet.create({
  iconWrapper: {
    height: '29%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 0,
    paddingTop: 20,
  },
  weatherIcon: {
    bottom: -15,
    width: 160,
    height: 150,
  },
});
