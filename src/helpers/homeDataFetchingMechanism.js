import {fetchGeoLocation} from '../api/Services/fetchGeoLocation';
import {settingDataOnFetchValues} from './settingDataOnFetchValues';
import {isDataExpired} from '../../utils/isDataExpired';
import {updatingData} from './updatingData';

export const homeDataFetchingMechanism = async (
  setLoading,
  loadFromAsyncStorage,
  setWeatherData,
  saveToAsyncStorage,
  source,
) => {
  let locationResponse = '';

  try {
    locationResponse = await fetchGeoLocation(); //else get the location from Geolocation

    if (locationResponse) {
      const passingKeyString =
        locationResponse.data.results[0].locations[0].adminArea5.toLowerCase();

      if (passingKeyString.length > 0) {
        //If data present in local storage,fetch it.

        let loadedWeatherData = await loadFromAsyncStorage(passingKeyString);

        loadedWeatherData = JSON.parse(loadedWeatherData);

        if (loadedWeatherData) {
          let caseString = '';
          if (!isDataExpired(loadedWeatherData.dataAddedTime)) {
            setWeatherData(loadedWeatherData); //If data exist in the local storage and not Expired then fetch It.
            return;
          } else {
            //If data is expired we need to update the data based on 3 parameters
            if (loadedWeatherData.favorite && loadedWeatherData.search) {
              //If the loaded data is marked as favorite and it is in recent search, we need to update the both favorite and search data.

              caseString = 'both';
              await updatingData(
                passingKeyString,
                saveToAsyncStorage,
                source,
                caseString,
              );
              return;
            } else if (loadedWeatherData.favorite) {
              //If the loaded data is marked as favorite and not in recent search we need to update the favorite data.

              caseString = 'favorite';
              await updatingData(
                passingKeyString,
                saveToAsyncStorage,
                source,
                caseString,
              );
              return;
            } else if (loadedWeatherData.search) {
              //If the loaded data is marked as search and not in favorite we need to update the search data.

              caseString = 'search';
              await updatingData(
                passingKeyString,
                saveToAsyncStorage,
                source,
                caseString,
              );
              return;
            }
          }
        }
        //If data is not exist in the local storage the fetch from weather API

        await settingDataOnFetchValues(
          passingKeyString,
          saveToAsyncStorage,
          source,
        );
      } else {
        console.log('No Data Passed as String OR Location Not Found');
      }
    } else {
      console.log('No Location Found with this Latitude and Longitude');
    }
  } catch (error) {
    const {code, message} = error;
    console.log(code, message);
  } finally {
    setLoading(false);
  }
};
