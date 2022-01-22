import {ImageBackground, StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import backIcon from '../assets/images/4_Search/icon_back_black.png';
import backgroundImage from '../assets/images/1_Splash/background_android.png';
import FavoriteCard from '../components/FavoriteCard';

const Favourite = ({navigation}) => {
  const onPressLeftIcon = () => {
    navigation.navigate('Home');
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.imageContainer}>
      <SafeAreaView style={styles.container}>
        <Header
          leftIcon={backIcon}
          rightIcon="search"
          headerText="Favourite"
          onPressLeftIcon={onPressLeftIcon}
          backGroundColor="#fff"
        />

        <View style={styles.favContainer}>
          <View style={styles.favContainerTextWrapper}>
            <Text style={styles.favContainerText}>
              6{' '}
              <Text style={styles.favContainerInnerText}>
                City added as favourite
              </Text>
            </Text>
            <Text style={styles.favContainerText}>Remove All</Text>
          </View>

          <View style={styles.favouriteCardContainer}>
            <FavoriteCard />
            <FavoriteCard />
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  favContainer: {
    flex: 1,
    padding: 16,
  },
  favContainerTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favouriteCardContainer: {
    flex: 1,
    marginTop: 23,
  },
  favContainerText: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 15,
  },
  favContainerInnerText: {
    fontWeight: '100',
    fontFamily: 'Roboto-Regular',
  },
});
