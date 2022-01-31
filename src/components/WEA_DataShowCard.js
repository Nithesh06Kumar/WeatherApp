import {
  Image,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {getName} from 'country-list';
import latinToEnglish from '../../utils/latinToEnglish';
import Images from '../constants/images';

const WEA_DataShowCard = ({item, onCardPress = null}) => {
  const {
    name,
    sys: {country},
    weather: [{icon, description}],
    main: {temp},
    favorite,
  } = item;

  const location = latinToEnglish(name);

  const renderShowPlaceName = () => {
    return (
      <Text style={styles.locationText}>
        {location},{' '}
        {country ? getName(country).split(' ').slice(0, 2).join(' ') : ''}
      </Text>
    );
  };

  const renderShowWeatherDetails = () => {
    return (
      <View style={styles.textWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${icon}@4x.png`,
            }}
            style={styles.sunIcon}
          />
        </View>
        <Text style={styles.temperature}>{Math.round(temp)}</Text>
        <View style={styles.tempUnitSection}>
          <Text style={styles.degreeSymbol}>o</Text>
          <Text style={styles.temperatureUnit}>C</Text>
        </View>
        <Text style={styles.weatherCondition}>{description}</Text>
      </View>
    );
  };

  const renderCardLeftData = () => {
    return (
      <View style={styles.LeftContainer}>
        {renderShowPlaceName()}
        {renderShowWeatherDetails()}
      </View>
    );
  };

  const renderCardRightIcon = () => {
    return (
      <View style={styles.favActiveIconWrapper}>
        <Image
          source={favorite ? Images.favActiveIcon : Images.favFalseIcon}
          style={styles.favActiveIcon}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity onPress={() => (onCardPress ? onCardPress(item) : null)}>
      <View style={styles.container}>
        {renderCardLeftData()}
        {renderCardRightIcon()}
      </View>
    </TouchableOpacity>
  );
};

export default WEA_DataShowCard;

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
    width: 40,
    height: 41,
  },
  imageWrapper: {
    width: 27,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 9,
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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
    paddingTop: 7,
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
    paddingBottom: 0.5,
  },
  weatherCondition: {
    flex: 1,
    color: '#fff',
    marginLeft: 17,
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
    lineHeight: 16,
    textTransform: 'capitalize',
    paddingBottom: 0.5,
  },
});
