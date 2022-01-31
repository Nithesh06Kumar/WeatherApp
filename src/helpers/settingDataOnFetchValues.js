//Method for fetchingthe new data

import {fetchUsers} from '../api/Services/fetchWeatherDataByLatAndLon';
import latinToEnglish from '../../utils/latinToEnglish';
export const settingDataOnFetchValues = async (
  passingKeyString,
  saveToAsyncStorage,
  source,
  searchedString = false,
) => {
  let responseData = await fetchUsers(passingKeyString, source); //fetching the the weather data from WEATHER API
  if (responseData) {
    const location = responseData.name;
    responseData = searchedString
      ? {
          ...responseData,
          favorite: false,
          search: true,
          dataAddedTime: new Date(),
        }
      : {
          ...responseData,
          favorite: false,
          search: false,
          dataAddedTime: new Date(),
        };
    const asyncStorageKey = latinToEnglish(location).toLowerCase(); //location name is in latin letter so converting to english
    saveToAsyncStorage(asyncStorageKey, responseData); //Storing data in async storage with location name as a key.
    return true;
  } else {
    console.log('No Location Found');
    return false;
  }
};
