import { Dimensions, ViewProps } from 'react-native';

import { theme } from '@src/styles/theme';

export const mapStyles = {
  flex: 1,
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const mapMarker = {
  width: 90,
  height: 80,
  borderRadius: 10,
  overflow: 'hidden',
} as ViewProps;

export const mapMarkerContainer = {
  height: 70,
  backgroundColor: theme.colors.orangePrimary,
  flexDirection: 'column',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 5,
} as ViewProps;

export const mapMarkerIcon = {
  width: 90,
  height: 45,
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
  backgroundColor: theme.colors.navyPrimary,
  zIndex: -1,
} as ViewProps;
