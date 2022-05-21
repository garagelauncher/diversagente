import { Dimensions, ViewProps } from 'react-native';

export const mapStyles = {
  flex: 1,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const calloutContainer = {
  width: 160,
  height: 46,
  paddingHorizontal: 16,

  backgroundColor: 'rgba(255,255,255, 0.8)',
  borderRadius: 16,

  justifyContent: 'center',
} as ViewProps;

export const calloutText = {
  fontSize: 14,
};
