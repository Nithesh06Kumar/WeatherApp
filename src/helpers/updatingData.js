// Method for updating the existing data

import {fetchUsers} from '../api/Services/fetchWeatherDataByLatAndLon';
import latinToEnglish from '../../utils/latinToEnglish';
export const updatingData = async (
  passingKeyString,
  saveToAsyncStorage,
  source,
  caseString,
) => {
  let responseData = await fetchUsers(passingKeyString, source); //fetching the the weather data from WEATHER API
  if (responseData) {
    const location = responseData.name;
    switch (caseString) {
      case 'favorite':
        response = {
          ...responseData,
          favorite: true,
          search: false,
          dataAddedTime: new Date(),
        };
        break;
      case 'search':
        response = {
          ...responseData,
          favorite: false,
          search: true,
          dataAddedTime: new Date(),
        };
        break;
      case 'both':
        response = {
          ...responseData,
          favorite: true,
          search: true,
          dataAddedTime: new Date(),
        };
        break;
    }
    const asyncStorageKey = latinToEnglish(location).toLowerCase(); //location name is in latin letter so converting to english
    saveToAsyncStorage(asyncStorageKey, response); //Storing data in async storage with location name as a key.
    return response;
  } else {
    console.log('No Location Found');
    return false;
  }
};
