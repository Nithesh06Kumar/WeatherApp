import {StyleSheet, Text, View, Image, Platform} from 'react-native';
import React, {useState, useEffect} from 'react';
import {format} from 'date-fns';

const DateTimeSection = () => {
  console.log('Date and Time');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const fetchDate = new Date();
      setDate(format(fetchDate, 'ccc, dd MMM yyyy'));
      setTime(format(fetchDate, 'hh:mm a'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeSection}>
        <Text style={styles.Text}>{date.toLocaleUpperCase()}</Text>
        <Text style={styles.Text}>{time}</Text>
      </View>
    </View>
  );
};

export default DateTimeSection;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '14%',
    // marginTop: 54,
  },
  dateTimeSection: {
    flexDirection: 'row',
    width: '65%',
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
    // marginTop: '21%',
  },
});
