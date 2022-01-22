import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import backgroundImage from '../assets/images/1_Splash/background_android.png';
import logo from '../assets/images/1_Splash/logo_splash.png';

const Splash = ({navigation}) => {
  console.log('Splash');

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.replace('DrawerNavigation');
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground source={backgroundImage} style={styles.container}>
        <Image source={logo} style={styles.logo} />
      </ImageBackground>
    </>
  );
};

export default Splash;

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
