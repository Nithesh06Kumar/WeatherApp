import axios from 'axios';
import weatherApi from '../weatherApi';
import {WEATHER_API_KEY} from '../../constants';

export const fetchUsers = async (location, source) => {
  try {
    const response = await weatherApi.get(
      `?q=${location}&appid=${WEATHER_API_KEY}&units=metric`,
      {cancelToken: source.token},
    );
    if (response.status === 200) {
      return response.data;
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
