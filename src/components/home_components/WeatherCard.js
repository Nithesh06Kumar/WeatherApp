import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const WeatherCard = ({icon, name, min, max, value, unit}) => {
  console.log('WeatherCard');

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image source={icon} style={styles.icon(name)} />
        <View>
          <Text style={styles.parameterTop}>{name}</Text>
          {value ? (
            <Text style={styles.parameterDown}>
              {Math.round(value)} {unit}
            </Text>
          ) : (
            <Text style={styles.parameterDown}>
              {Math.round(min)}°- {Math.round(max)}°
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 145,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 18,
  },
  innerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: name => ({
    width:
      name === 'Min-Max'
        ? 14
        : name === 'Pressure'
        ? 24
        : name === 'Humidity'
        ? 16
        : 26,
    height:
      name === 'Min-Max'
        ? 26
        : name === 'Pressure'
        ? 23
        : name === 'Humidity'
        ? 21
        : 18,
    marginRight: 15,
  }),
  parameterTop: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    lineHeight: 15,
  },
  parameterDown: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    marginTop: 5,
  },
});
