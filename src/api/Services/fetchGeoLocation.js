import GetLocation from 'react-native-get-location';
import axios from 'axios';
import {GEOCODING_API_KEY, GEOCODING_URL} from '../../constants';

export const fetchGeoLocation = async () => {
  try {
    const {latitude, longitude} = await GetLocation.getCurrentPosition(
      Platform.OS === 'android'
        ? {
            enableHighAccuracy: true,
            timeout: 15000,
          }
        : null,
    );

    locationResponse = await axios.get(
      `${GEOCODING_URL}?key=${GEOCODING_API_KEY}&location=${latitude},${longitude}`,
    );
    return locationResponse;
  } catch (e) {
    console.log(e);
  }
};
