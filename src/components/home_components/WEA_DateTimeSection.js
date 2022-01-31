import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {format} from 'date-fns';
import {Context} from '../../context/WEA_ContextProvider';
import {useWindowDimensions} from 'react-native';

const WEA_DateTimeSection = ({timezone}) => {
  const {weatherData} = useContext(Context);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const {height, width} = useWindowDimensions();
  let portrait = height > width;

  const fetchCurrentLocationDate = timezone => {
    const getDate = new Date();
    localTime = getDate.getTime();
    localOffset = getDate.getTimezoneOffset() * 60000;
    utc = localTime + localOffset;
    let timeByLocation = utc + 1000 * timezone;
    return new Date(timeByLocation);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const fetchDate = fetchCurrentLocationDate(timezone);
      setDate(format(fetchDate, 'ccc, dd MMM yyyy'));
      setTime(format(fetchDate, 'hh:mm a'));
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  return (
    <View style={portrait ? styles.container : styles.landscapeContainer}>
      <View
        style={
          portrait ? styles.dateTimeSection : styles.landscapeDateTimeSection
        }>
        <Text style={styles.Text}>
          {date ? date.toLocaleUpperCase() : null}
        </Text>
        <Text style={styles.Text}>{time ? time : null}</Text>
      </View>
    </View>
  );
};

export default WEA_DateTimeSection;

const styles = StyleSheet.create({
  container: {
    flex: 1.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dateTimeSection: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  Text: {
    opacity: 0.6,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: Platform.OS === 'android' ? 15 : 16,
    letterSpacing: 1.5,
    lineHeight: 15,
    textAlign: 'center',
  },
  landscapeContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landscapeDateTimeSection: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
