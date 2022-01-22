import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../../context/ContextProvider';

const TemperatureDetails = ({weatherIcon}) => {
  console.log('TempDetails');

  const {weatherData} = useContext(Context);
  const [toggleUnit, setToggleUnit] = useState('C');
  const [temp, setTemp] = useState();

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

  function convertToTitleCase(str) {
    return str
      .split(' ')
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }

  return (
    <View style={styles.weatherDetails}>
      <View style={styles.temperatureDetails}>
        <Text style={styles.temperature}>{Math.round(temp)}</Text>

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
      </View>

      <Text style={styles.weatherDesc}>
        {weatherData && convertToTitleCase(weatherData?.weather[0].description)}
      </Text>
    </View>
  );
};

export default TemperatureDetails;

const styles = StyleSheet.create({
  weatherDetails: {
    flex: 1,
    // marginTop: '21%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  temperatureDetails: {
    width: '34%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  },
});
