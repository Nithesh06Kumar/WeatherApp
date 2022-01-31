import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useWindowDimensions} from 'react-native';

const WEA_WeatherCard = ({icon, name, min, max, value, unit}) => {
  const {height, width} = useWindowDimensions();
  let portrait = height > width;

  const renderShowParameters = () => {
    return (
      <View style={styles.parameterContainer}>
        <Text style={styles.parameterTop}>{name}</Text>

        {typeof value == 'number' ? (
          <Text style={styles.parameterDown}>
            {Math.round(value)}
            {unit}
          </Text>
        ) : (
          <Text style={styles.parameterDown}>
            {Math.round(min)}°- {Math.round(max)}°
          </Text>
        )}
      </View>
    );
  };

  return (
    <View
      style={portrait ? styles.container : styles.landscapeContainer(width)}>
      <View style={styles.innerContainer}>
        <Image source={icon} style={styles.icon(name)} />
        {renderShowParameters()}
      </View>
    </View>
  );
};

export default WEA_WeatherCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 140,
    height: '100%',
    justifyContent: Platform.OS === 'android' ? 'center' : 'flex-start',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 18,
  },
  innerContainer: {
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
        ? 26
        : name === 'Humidity'
        ? 16
        : 26,
    height:
      name === 'Min-Max'
        ? 29
        : name === 'Pressure'
        ? 26
        : name === 'Humidity'
        ? 21
        : 18,
    marginRight: 15,
    alignSelf: 'flex-start',
  }),
  parameterContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  parameterTop: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
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

  landscapeContainer: width => ({
    flex: 1,
    width: width / 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 18,
  }),
});
