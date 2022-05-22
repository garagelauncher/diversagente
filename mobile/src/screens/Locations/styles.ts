import { Dimensions, ViewProps } from 'react-native';

export const mapStyles = {
  flex: 1,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const mapMarker = {
  borderRadius: 10,
  // overflow: 'hidden',
  maxWidth: 300,
  maxHeight: 500,
  minHeight: 100,
  backgroundColor: 'transparent',
  alignItems: 'center',
} as ViewProps;
