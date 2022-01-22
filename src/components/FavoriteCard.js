import {Image, StyleSheet, Text, View, Platform} from 'react-native';
import React from 'react';
import sunIcon from '../assets/images/7_Favourite/icon_mostly_sunny_small.png';
import favActiveIcon from '../assets/images/7_Favourite/icon_favourite_active.png';

const FavoriteCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.LeftContainer}>
        <Text style={styles.locationText}>Udupi, Karnataka</Text>
        <View style={styles.textWrapper}>
          <Image source={sunIcon} style={styles.sunIcon} />
          <Text style={styles.temperature}>31</Text>
          <View style={styles.tempUnitSection}>
            <Text style={styles.degreeSymbol}>o</Text>
            <Text style={styles.temperatureUnit}>C</Text>
          </View>
          <Text style={styles.weatherCondition}>Mostly Sunny</Text>
        </View>
      </View>
      <View style={styles.favActiveIconWrapper}>
        <Image source={favActiveIcon} style={styles.favActiveIcon} />
      </View>
    </View>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    height: 85,
    backgroundColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 1,
  },
  favActiveIconWrapper: {
    flex: 1,
  },
  favActiveIcon: {
    width: 19.5,
    height: 18,
  },
  sunIcon: {
    width: 22,
    height: 23,
    marginRight: 9,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  LeftContainer: {
    flex: 15,
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  locationText: {
    color: '#FFE539',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    marginBottom: 10,
  },
  temperature: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
  },
  degreeSymbol: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    lineHeight: 11,
    position: 'absolute',
    top: -4,
    left: 0,
  },
  temperatureUnit: {
    color: '#fff',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 15,
    marginTop: 2,
    marginLeft: 5,
  },
  weatherCondition: {
    flex: 1,
    color: '#fff',
    marginLeft: 17,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    lineHeight: 16,
  },
});
