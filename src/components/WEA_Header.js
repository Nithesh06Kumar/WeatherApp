import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useWindowDimensions} from 'react-native';

const WEA_Header = ({
  onPressLeftIcon,
  onPressRightIcon,
  leftIcon,
  rightIcon,
  rightImage,
  headerComponent = null,
  headerText = null,
  backGroundColor = null,
  headerStyles = {},
  iconStyles = {},
}) => {
  const {height, width} = useWindowDimensions();
  let portrait = height > width;

  const renderHeaderLeftDetails = () => {
    return (
      <View style={styles.leftPart}>
        <TouchableOpacity onPress={onPressLeftIcon}>
          <Image source={leftIcon} style={styles.menuIcon} />
        </TouchableOpacity>

        {headerComponent ? (
          headerComponent
        ) : (
          <Text style={styles.headerText}>{headerText}</Text>
        )}
      </View>
    );
  };

  const renderHeaderRightIcon = () => {
    return (
      <View style={styles.rightPart}>
        <TouchableOpacity onPress={onPressRightIcon}>
          {rightImage ? (
            <Image source={rightImage} style={styles.searchImage} />
          ) : (
            <Icon name={rightIcon} style={[styles.searchIcon, iconStyles]} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[
        headerStyles,
        portrait
          ? styles.container(backGroundColor)
          : styles.landscapeContainer(backGroundColor),
      ]}>
      {renderHeaderLeftDetails()}
      {renderHeaderRightIcon()}
    </View>
  );
};

export default WEA_Header;

const styles = StyleSheet.create({
  container: backGroundColor => ({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: backGroundColor ? backGroundColor : 'transparent',
  }),
  leftPart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 18,
    height: 16,
  },
  searchImage: {
    width: 18,
    height: 18,
  },
  searchIcon: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 22,
    marginRight: 10,
  },
  headerText: {
    width: 204,
    height: 24,
    marginLeft: 34,
    color: '#292F33',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    textShadowColor: 'rgba(0,0,0,0.15)',
  },
  rightPart: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  landscapeContainer: backGroundColor => ({
    flex: 1.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: backGroundColor ? backGroundColor : 'transparent',
  }),
});
