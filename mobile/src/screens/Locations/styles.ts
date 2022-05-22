import { theme as nativeBaseTheme } from 'native-base';
import { Dimensions, ViewProps } from 'react-native';

import { theme } from '@src/styles/theme';

export const mapStyles = {
  flex: 1,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const mapMarker = {
  borderRadius: 10,
  overflow: 'hidden',
} as ViewProps;

export const mapMarkerContainer = {
  backgroundColor: theme.colors.orangePrimary,
  flexDirection: 'column',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 5,
} as ViewProps;

export const mapMarkerIcon = {
  width: 90,
  min: 45,
  resizeMode: 'cover',
};

export const mapMarkerTitle = {
  flex: 1,
  color: '#FFF',
  fontSize: 13,
  lineHeight: 23,
};

export const mapPicker = {
  transform: [
    {
      rotate: '-45deg',
    },
  ],
  position: 'absolute',
  bottom: -15,
  width: 15,
  height: 15,
  backgroundColor: nativeBaseTheme.colors.blue[700],
  zIndex: -1,
} as ViewProps;
