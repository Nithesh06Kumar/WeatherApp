import {isDataExpired} from '../../utils/isDataExpired';
import {updatingData} from './updatingData';

export const fetchByCategory = async (
  categoryName,
  getMultipleValuesFromAsyncStorage,
  setCategoryKeys,
  setCategoryData,
  setLoading,
  saveToAsyncStorage,
  source,
) => {
  const bulkValues = await getMultipleValuesFromAsyncStorage(); //Loading all the  [key,value] data from async storage
  let keys = [],
    values = [];
  bulkValues
    .filter(item => JSON.parse(item[1])[categoryName] === true) //filtering only the favorite values
    .forEach(async item => {
      keys.push(item[0]);
      if (isDataExpired(JSON.parse(item[1]).dataAddedTime)) {
        let caseString = '';
        let parameter = categoryName === 'favorite' ? 'search' : 'favorite'; //If we are doing this for favorite we have to check for present in search and vice versa
        if (JSON.parse(item[1])[parameter]) {
          //Data expired updating the favorite values

          caseString = 'both';
          const response = await updatingData(
            item[0],
            saveToAsyncStorage,
            source,
            caseString,
          );
        } else {
          caseString = categoryName;
          const response = await updatingData(
            item[0],
            saveToAsyncStorage,
            source,
            caseString,
          );
        }

        values.push(response);
      } else {
        values.push(JSON.parse(item[1]));
      }
    });

  setCategoryData(values);
  setCategoryKeys(keys);

  setLoading(false);
};
