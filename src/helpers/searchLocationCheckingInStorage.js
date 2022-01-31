export const searchLocationCheckingInStorage = (
  passingKeyString,
  loadedWeatherData,
  setWeatherData,
  saveToAsyncStorage,
) => {
  //Condition for already exist Search data after clearing recent Search data

  if (JSON.parse(loadedWeatherData).search) {
    //If deleted from recent search search=false

    setWeatherData(JSON.parse(loadedWeatherData));
    return true;
  } else {
    saveToAsyncStorage(passingKeyString, {
      //Saving data as search=true If same location searched again after deletion of recent search.

      ...JSON.parse(loadedWeatherData),
      search: true,
    });
    setWeatherData(JSON.parse(loadedWeatherData));
    return true;
  }
};
