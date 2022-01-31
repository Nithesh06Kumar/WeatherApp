import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useContext, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/WEA_Header';
import FavoriteCard from '../components/WEA_DataShowCard';
import {Context} from '../context/WEA_ContextProvider';
import {useFocusEffect} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import latinToEnglish from '../../utils/latinToEnglish';
import {isDataExpired} from '../../utils/isDataExpired';
import {fetchByCategory} from '../helpers/fetchByCategory';
import axios from 'axios';
import Images from '../constants/images';

const WEA_FavouriteScreen = ({navigation, onPressSearchIcon}) => {
  const {
    getMultipleValuesFromAsyncStorage,
    weatherData,
    setWeatherData,
    replaceToAsyncStorage,
    loadFromAsyncStorage,
    removeItemsFromStorage,
    saveToAsyncStorage,
  } = useContext(Context);
  const [favoriteData, setFavoriteData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [favoriteKeys, setFavoriteKeys] = useState([]);
  const animationIsRunning = useRef(false);
  const rowTranslateAnimatedValues = useRef(new Animated.Value(0)).current;

  const onPressLeftIcon = () => {
    navigation.goBack();
  };

  // On card press the data should show in the home
  const onCardPress = data => {
    setWeatherData(data);
    navigation.goBack();
  };

  const deleteAllFavourite = async () => {
    Alert.alert('', 'Are you sure want to remove all favorites?', [
      {text: 'No', style: 'No', onPress: () => {}},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          //Deleting Mechanism for Remove All button
          favoriteKeys.forEach((item, index) => {
            //This Condition is for when app stays open in Favorite for 30 minutes and then press remove All
            isDataExpired(favoriteData[index].dataAddedTime) && //Caching: If data is expired and not in recent search then Delete
            !favoriteData[index].search
              ? removeItemsFromStorage(item)
              : replaceToAsyncStorage(item, {
                  ...favoriteData[index],
                  favorite: false,
                }); //replacing the favorite data with false value
          });
          setFavoriteData([]);
          setWeatherData({...weatherData, favorite: false});
        },
      },
    ]);
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      const source = axios.CancelToken.source();
      try {
        fetchByCategory(
          //Fetching all the favorite values in the local storage which are not expired. if expired fetchinging new values.
          'favorite',
          getMultipleValuesFromAsyncStorage,
          setFavoriteKeys,
          setFavoriteData,
          setLoading,
          saveToAsyncStorage,
          source,
        );
      } catch (e) {
        console.log(e);
      }
      return () => source.cancel('Data fetching cancelled');
    }, []),
  );

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData; //performing functionality for swipable List
    if (
      value <= -Dimensions.get('window').width &&
      !animationIsRunning.current
    ) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(async () => {
        if (key) {
          // On Swipe performing the deletion of row value
          const prevIndex = favoriteData.findIndex(item => item.name === key);
          const storingData = favoriteData[prevIndex];
          const newData = [...favoriteData];
          const newKeys = [...favoriteKeys];
          newKeys.splice(prevIndex, 1); //Removing both key and value from favorite array
          newData.splice(prevIndex, 1);
          setFavoriteData(newData);
          setFavoriteKeys(newKeys);
          replaceToAsyncStorage(latinToEnglish(key).toLowerCase(), {
            ...storingData,
            favorite: false,
          });
          if (weatherData && weatherData.name === key) {
            //udpdates the weather favorite status in Home page
            setWeatherData({...weatherData, favorite: false});
          }
        }
        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = (
    data, //Render Component for the swipeable list
  ) => (
    <Animated.View>
      <TouchableHighlight underlayColor={'transparent'}>
        <View>
          <FavoriteCard {...data} onCardPress={onCardPress} />
        </View>
      </TouchableHighlight>
    </Animated.View>
  );

  const renderHiddenItem = () => <View></View>; //Hidden Component for swipeable list

  const renderIsLoaing = () => {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };
  const renderSwipeListView = () => {
    return (
      <View style={styles.favouriteCardContainer}>
        <SwipeListView
          disableRightSwipe
          data={favoriteData}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-Dimensions.get('window').width}
          onSwipeValueChange={onSwipeValueChange}
          useNativeDriver={true}
          keyExtractor={item => item.name}
        />
      </View>
    );
  };
  const renderFavoriteData = () => {
    return (
      <View style={styles.favContainer}>
        <View style={styles.favContainerTextWrapper}>
          <Text style={styles.favContainerText}>
            {favoriteData.length}{' '}
            <Text style={styles.favContainerInnerText}>
              City added as favourite
            </Text>
          </Text>
          <TouchableOpacity onPress={deleteAllFavourite}>
            <Text style={styles.favContainerText}>Remove All</Text>
          </TouchableOpacity>
        </View>
        {renderSwipeListView()}
      </View>
    );
  };

  const renderNoFavorite = () => {
    return (
      <View style={styles.dataNotFoundImageWrapper}>
        <Image
          source={Images.noDataFoundImage}
          style={styles.dataNotFoundImage}
        />
        <Text style={styles.dataNotFoundText}>No Favourites Added</Text>
      </View>
    );
  };
  const renderHeader = () => {
    return (
      <Header
        leftIcon={Images.backIcon}
        rightIcon="search"
        headerText="Favourite"
        onPressLeftIcon={onPressLeftIcon}
        onPressRightIcon={onPressSearchIcon}
        backGroundColor="#fff"
      />
    );
  };
  return (
    <ImageBackground
      source={Images.backgroundImage}
      style={styles.imageContainer}>
      <SafeAreaView style={styles.container}>
        {renderHeader()}
        {isLoading
          ? renderIsLoaing()
          : favoriteData.length > 0
          ? renderFavoriteData()
          : renderNoFavorite()}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WEA_FavouriteScreen;

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
    flex: 20,
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
  dataNotFoundImageWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataNotFoundImage: {
    width: '50%',
    height: '23%',
    resizeMode: 'contain',
  },
  dataNotFoundText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
  },
  activityIndicator: {
    flex: 20,
    justifyContent: 'center',
    textAlign: 'center',
  },
});
