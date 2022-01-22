import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import favIcon from '../../assets/images/2_Home/icon_favourite.png';
import {Context} from '../../context/ContextProvider';
import {getName} from 'country-list';

const AddtoFav = () => {
  const {weatherData} = useContext(Context);

  console.log('Add to fav');

  return (
    <View style={styles.container}>
      <Text style={styles.placeText}>
        {weatherData?.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')},{' '}
        {weatherData && getName(weatherData?.sys.country)}
      </Text>
      <View style={styles.addFavourite}>
        <Image source={favIcon} style={styles.favIcon} />
        <Text style={styles.addFavText}>Add to favorite</Text>
      </View>
    </View>
  );
};

export default AddtoFav;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
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
});
