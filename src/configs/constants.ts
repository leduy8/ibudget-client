import {Dimensions} from 'react-native';

export const API = "http://192.168.1.67:5000";

const constants = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('screen').height,
  FONTS_APP: 'Muli',
};
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export default constants;
