import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/WEA_Header';
import DateTimeSection from '../components/home_components/WEA_DateTimeSection';
import AddtoFav from '../components/home_components/WEA_AddtoFavSection';
import TemperatureDetails from '../components/home_components/WEA_TemperatureDetails';
import WeatherDetails from '../components/home_components/WEA_WeatherDetails';
import {Context} from '../context/WEA_ContextProvider';
import WeatherIcon from '../components/home_components/WEA_WeatherIcon';
import {useWindowDimensions} from 'react-native';
import axios from 'axios';
import {homeDataFetchingMechanism} from '../helpers/homeDataFetchingMechanism';
import Images from '../constants/images';

const HeaderComponent = () => {
  return <Image source={Images.logo} style={styles.logo} />;
};

const WEA_HomeScreen = ({navigation, onPressSearchIcon}) => {
  const [isLoading, setLoading] = useState(true);
  const {height, width} = useWindowDimensions();
  const {
    weatherData,
    setWeatherData,
    saveToAsyncStorage,
    loadFromAsyncStorage,
    searchedString,
    setFavoriteDataChanged,
  } = useContext(Context);

  const onPressLeftIcon = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    setLoading(true);
    const source = axios.CancelToken.source();
    //Location Fetching and Location data Setting Starts
    if (!searchedString) {
      homeDataFetchingMechanism(
        setLoading,
        loadFromAsyncStorage,
        setWeatherData,
        saveToAsyncStorage,
        source,
      );
    } else {
      setLoading(false);
    }
    return () => source.cancel('Data fetching cancelled');
  }, []);

  const renderHeader = () => {
    return (
      <Header
        leftIcon={Images.menuIcon}
        rightImage={Images.searchIcon}
        headerComponent={<HeaderComponent />}
        onPressLeftIcon={onPressLeftIcon}
        onPressRightIcon={onPressSearchIcon}
      />
    );
  };

  const renderHomeBody = () => {
    return (
      <>
        <DateTimeSection timezone={weatherData.timezone} />
        <AddtoFav />
        <WeatherIcon />
        <TemperatureDetails />
        <WeatherDetails />
      </>
    );
  };

  const renderIsLoading = () => {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  //Main Return
  return (
    <ImageBackground source={Images.backgroundImage} style={styles.container}>
      <SafeAreaView
        style={styles.innerContainer}
        edges={['top', 'left', 'right']}>
        {renderHeader()}
        {!isLoading && weatherData ? renderHomeBody() : renderIsLoading()}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WEA_HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  innerContainer: {
    flex: 1,
  },
  logo: {
    width: 113,
    height: 24,
    marginLeft: 32,
  },
  activityIndicator: {
    flex: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
