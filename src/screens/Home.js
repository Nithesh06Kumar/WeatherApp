import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import backgroundImage from '../assets/images/1_Splash/background_android.png';
import Header from '../components/Header';
import DateTimeSection from '../components/home_components/DateTimeSection';
import AddtoFav from '../components/home_components/AddtoFavSection';
import menuIcon from '../assets/images/2_Home/icon_menu_white.png';
import logo from '../assets/images/2_Home/logo.png';
import searchIcon from '../assets/images/2_Home/icon_search_white.png';
import TemperatureDetails from '../components/home_components/TemperatureDetails';
import WeatherDetails from '../components/home_components/WeatherDetails';
import weatherApi from '../api/weatherApi';
import axios from 'axios';
import GetLocation from 'react-native-get-location';
import {Context} from '../context/ContextProvider';
import WeatherIcon from '../components/home_components/WeatherIcon';

const API_KEY = 'b7f265518bf52aea68c391691f383b92';

const HeaderComponent = () => {
  return <Image source={logo} style={styles.logo} />;
};

const Home = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const {weatherData, setWeatherData} = useContext(Context);

  console.log('Home');

  const onPressLeftIcon = () => {
    navigation.openDrawer();
  };

  console.log(JSON.stringify(weatherData, null, 2));

  useEffect(() => {
    const getGeoLocation = async () => {
      try {
        const {latitude, longitude} = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        });
        console.log('Latitude', latitude);

        if (latitude && longitude) {
          const source = axios.CancelToken.source();
          const fetchUsers = async () => {
            try {
              const response = await weatherApi.get(
                `?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
                {cancelToken: source.token},
              );
              if (response.status === 200) {
                setWeatherData(response.data);
                console.log('Succuss');

                return;
              } else {
                throw new Error('Failed to fetch users');
              }
            } catch (error) {
              if (axios.isCancel(error)) {
                console.log('Data fetching cancelled');
              } else {
                console.log(error);
              }
            }
          };

          fetchUsers();

          return () => source.cancel('Data fetching cancelled');
        } else {
          console.log('No latitude and longitude');
        }
      } catch (error) {
        const {code, message} = error;
        console.log(code, message);
      } finally {
        setLoading(false);
      }
    };
    getGeoLocation();
  }, []);
  return (
    <ImageBackground source={backgroundImage} style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <SafeAreaView style={styles.innerContainer}>
          <Header
            leftIcon={menuIcon}
            rightImage={searchIcon}
            headerComponent={<HeaderComponent />}
            onPressLeftIcon={onPressLeftIcon}
          />
          <DateTimeSection />
          <AddtoFav />
          <WeatherIcon />
          <TemperatureDetails />
          <WeatherDetails />
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
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
});
