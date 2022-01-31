import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Touchable,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Header from '../components/WEA_Header';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Context} from '../context/WEA_ContextProvider';
import {searchLocationCheckingInStorage} from '../helpers/searchLocationCheckingInStorage';
import {settingDataOnFetchValues} from '../helpers/settingDataOnFetchValues';
import {isDataExpired} from '../../utils/isDataExpired';
import axios from 'axios';
import {updatingData} from '../helpers/updatingData';
import Images from '../constants/images';
const WEA_SearchScreen = ({navigation}) => {
  const {
    searchedString,
    setSearchString,
    loadFromAsyncStorage,
    setWeatherData,
    saveToAsyncStorage,
  } = useContext(Context);
  const [searchedPlace, setSearchedPlace] = useState('');
  const [errorFlag, setErrorFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPressLeftIcon = () => {
    navigation.goBack();
  };

  const onPressCancelIcon = () => {
    setIsLoading(false);
    setErrorFlag(false);
    setSearchedPlace('');
  };

  const onSubmitClick = async () => {
    setIsLoading(true);
    const source = axios.CancelToken.source();
    try {
      const loadedWeatherData = await loadFromAsyncStorage(
        //Load the data from the local storage using searched place
        searchedPlace.toLowerCase(),
      );

      let response;
      let oldDate = loadedWeatherData
        ? JSON.parse(loadedWeatherData).dataAddedTime
        : '';

      if (loadedWeatherData && !isDataExpired(oldDate)) {
        //If data present in local storage and not expired then fetch it.

        response = await searchLocationCheckingInStorage(
          searchedPlace.toLowerCase(),
          loadedWeatherData,
          setWeatherData,
          saveToAsyncStorage,
        );
      } else if (loadedWeatherData && JSON.parse(loadedWeatherData).favorite) {
        //If the loaded data is marked as favorite and not in recent search we need to update the favorite data.

        caseString = 'both';
        response = await updatingData(
          searchedPlace.toLowerCase(),
          saveToAsyncStorage,
          source,
          caseString,
        );
      } else {
        let searchedString = true;
        response = await settingDataOnFetchValues(
          //If data not in local storage fetch from API
          searchedPlace.toLowerCase(),
          saveToAsyncStorage,
          source,
          searchedString,
        );
      }
      if (response) {
        setIsLoading(false);
        setSearchString(searchedPlace.toLowerCase());
        setSearchedPlace('');
        navigation.replace('DrawerNavigation');
      } else {
        setIsLoading(false);
        setErrorFlag(true);
      }
    } catch (e) {
      console.log(e);
    }
    return () => source.cancel('Data fetching cancelled');
  };

  const renderHeader = () => {
    return (
      <Header
        leftIcon={Images.backIcon}
        headerComponent={
          <TextInput
            style={styles.inputText}
            onChangeText={text => {
              setErrorFlag(false);
              setSearchedPlace(text);
            }}
            value={searchedPlace}
            placeholder="Search For City"
            onSubmitEditing={onSubmitClick}
            autoComplete="off"
            autoCorrect={false}
          />
        }
        rightIcon={searchedPlace.length > 0 ? 'close' : null}
        onPressLeftIcon={onPressLeftIcon}
        onPressRightIcon={onPressCancelIcon}
        backGroundColor="#fff"
        headerStyles={{
          borderBottomWidth: 1,
          borderColor: 'rgba(0,0,0,0.1)',
        }}
        iconStyles={{fontSize: 25, color: 'rgba(0,0,0,0.4)'}}
      />
    );
  };

  const renderIsLoading = () => {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  };

  const renderSearchDataNotFount = () => {
    return <Text>Sorry! Data Not Found For Searched Location!</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <View style={styles.showLocationData}>
        {isLoading ? renderIsLoading() : null}
        {errorFlag ? renderSearchDataNotFount() : null}
      </View>
    </SafeAreaView>
  );
};

export default WEA_SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
  },
  inputText: {
    flex: 1,
    marginLeft: '10%',
    fontSize: 15,
    alignSelf: 'flex-end',
    padding: Platform.OS === 'android' ? 2 : 0,
  },
  Image: {
    width: 300,
    height: 500,
  },
  showLocationData: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
