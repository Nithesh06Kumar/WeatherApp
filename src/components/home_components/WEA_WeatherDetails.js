import {StyleSheet, Text, View, FlatList, Platform} from 'react-native';
import React, {useContext} from 'react';
import WeatherCard from './WEA_WeatherCard';
import {Context} from '../../context/WEA_ContextProvider';
import {useWindowDimensions} from 'react-native';
import Images from '../../constants/images';

const AllComponent = () => {
  const {weatherData} = useContext(Context);

  return (
    <>
      <WeatherCard
        icon={Images.tempIcon}
        name="Min-Max"
        min={weatherData?.main.temp_min}
        max={weatherData?.main.temp_max}
      />
      <WeatherCard
        icon={Images.precipitationIcon}
        name="Pressure"
        value={weatherData?.main.pressure}
        unit="hPa"
      />
      <WeatherCard
        icon={Images.humidityIcon}
        name="Humidity"
        value={weatherData?.main.humidity}
        unit="%"
      />
      <WeatherCard
        icon={Images.windIcon}
        name="Wind"
        value={weatherData?.wind.speed}
        unit="m/s"
      />
    </>
  );
};

const WEA_WeatherDetails = () => {
  const {height, width} = useWindowDimensions();
  let portrait = height > width;
  return (
    <View
      style={portrait ? styles.container : styles.landscapeContainer(width)}>
      <FlatList
        data={[{}]}
        renderItem={() => <AllComponent />}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export default WEA_WeatherDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    width: '100%',
    height: Platform.OS === 'ios' ? 115 : 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'flex-end',
  },
  landscapeContainer: width => ({
    flexGrow: 0,
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }),
});
