import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/WEA_Header';
import SearchCard from '../components/WEA_DataShowCard';
import {Context} from '../context/WEA_ContextProvider';
import {useFocusEffect} from '@react-navigation/native';
import {isDataExpired} from '../../utils/isDataExpired';
import {fetchByCategory} from '../helpers/fetchByCategory';
import axios from 'axios';
import Images from '../constants/images';

const WEA_RecentSearchScreen = ({navigation, onPressSearchIcon}) => {
  const [isLoading, setLoading] = useState(true);
  const {
    getMultipleValuesFromAsyncStorage,
    weatherData,
    setWeatherData,
    replaceToAsyncStorage,
    removeItemsFromStorage,
    saveToAsyncStorage,
  } = useContext(Context);
  const [searchedData, setSearchedData] = useState([]);
  const [searchedKeys, setSearchedKeys] = useState([]);

  const onPressLeftIcon = () => {
    navigation.goBack();
  };

  const deleteRecentSearch = async () => {
    //Deleting Mechanism for Remove All button
    Alert.alert('', 'Are you sure want to remove all recent search?', [
      {text: 'No', style: 'No', onPress: () => {}},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          searchedKeys.forEach((item, index) => {
            isDataExpired(searchedData[index].dataAddedTime) && //caching: If data is expired and not in favorite we can delete that item
            !searchedData[index].favorite
              ? removeItemsFromStorage(item)
              : replaceToAsyncStorage(item, {
                  ...searchedData[index],
                  search: false, //replacing the search data with false value
                });
          });
          setSearchedData([]);
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
          'search',
          getMultipleValuesFromAsyncStorage,
          setSearchedKeys,
          setSearchedData,
          setLoading,
          saveToAsyncStorage,
          source,
        );
      } catch (e) {
        console.log(e);
      }
      return () => {
        source.cancel('Data fetching cancelled');
        setLoading(true);
      };
    }, []),
  );

  const onCardPress = data => {
    setWeatherData(data);
    navigation.goBack();
  };
  const renderheader = () => {
    return (
      <Header
        leftIcon={Images.backIcon}
        rightIcon="search"
        headerText="Recent Search"
        onPressLeftIcon={onPressLeftIcon}
        onPressRightIcon={onPressSearchIcon}
        backGroundColor="#fff"
      />
    );
  };
  const renderIsLoading = () => {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };
  const renderSearchCardView = () => {
    return (
      <View style={styles.favouriteCardContainer}>
        <FlatList
          data={searchedData}
          renderItem={items => (
            <SearchCard {...items} onCardPress={onCardPress} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };
  const renderSearchBody = () => {
    return (
      <View style={styles.favContainer}>
        <View style={styles.favContainerTextWrapper}>
          <Text style={styles.favContainerText}>You recently searched for</Text>
          <TouchableOpacity onPress={deleteRecentSearch}>
            <Text style={styles.favContainerText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        {renderSearchCardView()}
      </View>
    );
  };

  const renderNoSearchData = () => {
    return (
      <View style={styles.dataNotFoundImageWrapper}>
        <Image
          source={Images.noDataFoundImage}
          style={styles.dataNotFoundImage}
        />
        <Text style={styles.dataNotFoundText}>No Recent Search</Text>
      </View>
    );
  };

  return (
    <ImageBackground
      source={Images.backgroundImage}
      style={styles.imageContainer}>
      <SafeAreaView style={styles.container}>
        {renderheader()}
        {isLoading
          ? renderIsLoading()
          : searchedData.length > 0
          ? renderSearchBody()
          : renderNoSearchData()}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WEA_RecentSearchScreen;

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
