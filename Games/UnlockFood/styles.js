import {
  StyleSheet,
} from 'react-native';

const SCREEN_WIDTH = require('Dimensions').get('window').width;
const SCREEN_HEIGHT = require('Dimensions').get('window').height;

const UnlockFoodStyles = StyleSheet.create ({
  container: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  backgroundImage: {
    flex: 1,
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },
  button: {
    backgroundColor: '#4d94ff',
    borderRadius: 10,
    width: 100,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
  },
  blackout: {
    flex: 1,
    backgroundColor: 'black',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    position: 'absolute',
  },
});

export default UnlockFoodStyles;
