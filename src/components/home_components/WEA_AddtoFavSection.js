import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import React, {useContext} from 'react';
import {Context} from '../../context/WEA_ContextProvider';
import {getName} from 'country-list';
import latinToEnglish from '../../../utils/latinToEnglish';
import {useWindowDimensions} from 'react-native';
import Images from '../../constants/images';

const WEA_AddtoFav = () => {
  const {weatherData, loadFromAsyncStorage, saveToAsyncStorage} =
    useContext(Context);
  const {height, width} = useWindowDimensions();
  let portrait = height > width;

  const {
    sys: {country},
  } = weatherData;

  const location = latinToEnglish(weatherData.name);

  const toggleTheFavoriteOption = async value => {
    const weatherKey = location.toLowerCase();
    const savingData = {...weatherData, favorite: value};
    saveToAsyncStorage(weatherKey, savingData);
  };

  const renderlocation = () => {
    return (
      <Text style={portrait ? styles.placeText : styles.landscapePlaceText}>
        {location},{' '}
        {weatherData && country
          ? getName(country).split(' ').slice(0, 2).join(' ')
          : ''}
      </Text>
    );
  };

  const renderAddtoFavButton = () => {
    return (
      <TouchableOpacity
        style={portrait ? styles.addFavourite : styles.landscapeAddFavourite}
        onPress={() => toggleTheFavoriteOption(!weatherData.favorite)}>
        <Image
          source={
            weatherData.favorite ? Images.favActiveIcon : Images.favFalseIcon
          }
          style={styles.favIcon}
        />
        <Text style={styles.addFavText}>
          {weatherData.favorite ? 'Favourite' : 'Add to favorite'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={portrait ? styles.container : styles.landscapeContainer}>
      {renderlocation()}
      {renderAddtoFavButton()}
    </View>
  );
};

export default WEA_AddtoFav;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 4,
  },

  placeText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
    paddingTop: '4%',
  },
  addFavourite: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '6%',
  },
  favIcon: {
    height: 19,
    width: 20,
  },
  addFavText: {
    height: 15,
    width: 94,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 15,
    marginLeft: 8,
  },
  landscapeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  landscapePlaceText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
    textAlign: 'center',
  },
  landscapeAddFavourite: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
});
