import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useContext} from 'react';
import WeatherCard from './WeatherCard';
import tempIcon from '../../assets/images/2_Home/icon_temperature_info.png';
import precipitationIcon from '../../assets/images/2_Home/icon_precipitation_info.png';
import humidityIcon from '../../assets/images/2_Home/icon_humidity_info.png';
import windIcon from '../../assets/images/2_Home/icon_wind_info.png';
import {Context} from '../../context/ContextProvider';

const AllComponent = () => {
  console.log('Weather Details');
  const {weatherData} = useContext(Context);

  return (
    <>
      <WeatherCard
        icon={tempIcon}
        name="Min-Max"
        min={weatherData?.main.temp_min}
        max={weatherData?.main.temp_max}
      />
      <WeatherCard
        icon={precipitationIcon}
        name="Pressure"
        value={weatherData?.main.pressure}
        unit="hPa"
      />
      <WeatherCard
        icon={humidityIcon}
        name="Humidity"
        value={weatherData?.main.humidity}
        unit="%"
      />
      <WeatherCard
        icon={windIcon}
        name="Wind"
        value={weatherData?.wind.speed}
        unit="km/h"
      />
    </>
  );
};

const WeatherDetails = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[{}]}
        renderItem={() => <AllComponent />}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default WeatherDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'flex-end',
  },
});
