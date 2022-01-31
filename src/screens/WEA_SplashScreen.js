import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {Context} from '../context/WEA_ContextProvider';
import {isDataExpired} from '../../utils/isDataExpired';
import Images from '../constants/images';

const WEA_SplashScreen = ({navigation}) => {
  const {
    getAllKeysFromAsyncStorage,
    loadFromAsyncStorage,
    removeItemsFromStorage,
    getMultipleValuesFromAsyncStorage,
  } = useContext(Context);

  useEffect(() => {
    let timer = setTimeout(async () => {
      const bulkValues = await getMultipleValuesFromAsyncStorage();
      bulkValues.forEach(async item => {
        if (
          isDataExpired(JSON.parse(item[1]).dataAddedTime) &&
          JSON.parse(item[1]).favorite === false &&
          JSON.parse(item[1]).search === false
        ) {
          await removeItemsFromStorage(item[0]);
        }
      });
      navigation.replace('DrawerNavigation');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground source={Images.backgroundImage} style={styles.container}>
        <Image source={Images.logo} style={styles.logo} />
      </ImageBackground>
    </>
  );
};

export default WEA_SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  logo: {
    height: 36,
    width: 170,
  },
});
