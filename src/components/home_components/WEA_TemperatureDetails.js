import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../../context/WEA_ContextProvider';
import {useWindowDimensions} from 'react-native';

const WEA_TemperatureDetails = () => {
  const {weatherData} = useContext(Context);
  const [toggleUnit, setToggleUnit] = useState('C');
  const [temp, setTemp] = useState(0);
  const {height, width} = useWindowDimensions();
  let portrait = height > width;

  useEffect(() => {
    setTemp(weatherData?.main.temp);
  }, [weatherData?.main.temp]);

  const temperatureConverter = () => {
    if (toggleUnit === 'F') {
      setTemp(((temp - 32) * 5) / 9);
    } else if (toggleUnit === 'C') {
      setTemp((temp * 9) / 5 + 32);
    } else {
      return;
    }
  };

  const renderShowTemperature = () => {
    return <Text style={styles.temperature}>{Math.round(temp)}</Text>;
  };
  const renderWeatherDiscription = () => {
    return (
      <Text style={portrait ? styles.weatherDesc : styles.landscapeWeatherDesc}>
        {weatherData && weatherData?.weather[0].description}
      </Text>
    );
  };

  const renderTempConvertButtons = () => {
    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.buttonC(toggleUnit)}
          onPress={() => {
            setToggleUnit('C');
            temperatureConverter();
          }}>
          <Text style={styles.degreeSymbol1(toggleUnit)}>o</Text>
          <Text style={styles.temperatureUnits1(toggleUnit)}>C</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonF(toggleUnit)}
          onPress={() => {
            setToggleUnit('F');
            temperatureConverter();
          }}>
          <Text style={styles.degreeSymbol2(toggleUnit)}>o</Text>
          <Text style={styles.temperatureUnits2(toggleUnit)}>F</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={portrait ? styles.weatherDetails : styles.landscapeWeatherDetails}>
      <View
        style={
          portrait
            ? styles.temperatureDetails
            : styles.landscapeTemperatureDetails
        }>
        {renderShowTemperature()}
        {renderTempConvertButtons()}
      </View>
      {renderWeatherDiscription()}
    </View>
  );
};

export default WEA_TemperatureDetails;

const styles = StyleSheet.create({
  weatherDetails: {
    flex: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  temperatureDetails: {
    width: '38%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  temperature: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 58,
    fontWeight: '500',
    lineHeight: 61,
    marginRight: 10,
    textAlign: 'right',

    alignItems: 'flex-end',
  },
  buttonWrapper: {
    height: 33,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 2,
    overflow: 'hidden',
  },

  buttonC: toggleUnit => ({
    height: 32,
    width: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,

    backgroundColor: toggleUnit === 'C' ? '#fff' : 'transparent',
  }),
  buttonF: toggleUnit => ({
    height: 32,
    width: 29,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3,

    backgroundColor: toggleUnit === 'F' ? '#fff' : 'transparent',
  }),
  temperatureUnits1: toggleUnit => ({
    color: toggleUnit === 'C' ? '#E32843' : '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  }),
  temperatureUnits2: toggleUnit => ({
    color: toggleUnit === 'F' ? '#E32843' : '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
  }),
  degreeSymbol1: toggleUnit => ({
    color: toggleUnit === 'C' ? '#E32843' : '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 19,
    position: 'absolute',
    top: -2,
    left: 2,
  }),
  degreeSymbol2: toggleUnit => ({
    color: toggleUnit === 'F' ? '#E32843' : '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 19,
    position: 'absolute',
    top: -2,
    left: 2,
  }),
  weatherDesc: {
    marginTop: 11,
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 19,
    lineHeight: 21,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  landscapeWeatherDetails: {
    flex: 5.5,
    alignItems: 'center',
    overflow: 'hidden',
  },
  landscapeTemperatureDetails: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
  },
  landscapeWeatherDesc: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 19,
    lineHeight: 21,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
