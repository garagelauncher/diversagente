import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as ExpoLocation from 'expo-location';
import { Box, Button, Text } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import MapView, { MapEvent, Marker, Region } from 'react-native-maps';

import { baseCoordinates } from '@src/configs';
import { StackLocationNavigatorParamList } from '@src/routes/locationStack.routes';
import { theme } from '@src/styles/theme';

type SelectLocationMapScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'SelectLocationMap'
>;

export const SelectLocationMap = () => {
  const navigation = useNavigation<SelectLocationMapScreenNavigationProps>();

  const [address, setAddress] = useState('');

  const [initialPosition, setInitialPosition] = useState<Region | undefined>(
    undefined,
  );
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  const getLocationAddress = async (coordinates: {
    latitude: number;
    longitude: number;
  }) => {
    if (coordinates) {
      const locationData = await ExpoLocation.reverseGeocodeAsync(coordinates);

      let newAddress = '';
      for (const item of locationData) {
        newAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
      }

      setAddress(newAddress);
    }
  };

  const handleNavigateToCreateLocation = async () => {
    console.info('navigating handleNavigateToCreateLocation');

    navigation.navigate('FormCreateLocation', {
      address,
      coordinates: position,
    });
  };

  const getCurrentUserLocation = useCallback(async () => {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Você negou a permissão de localização',
        'Precisamos de sua permissão para obter a localização.',
      );
      return;
    }

    const location = await ExpoLocation.getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;

    console.debug('latitude', latitude);
    console.debug('longitude', longitude);
    setInitialPosition({
      latitude,
      longitude,
      latitudeDelta: baseCoordinates.LATITUDE_DELTA,
      longitudeDelta: baseCoordinates.LONGITUDE_DELTA,
    });
  }, []);

  async function handleSelectMapPosition(event: MapEvent) {
    setInitialPosition({
      ...event.nativeEvent.coordinate,
      latitudeDelta: baseCoordinates.LATITUDE_DELTA,
      longitudeDelta: baseCoordinates.LONGITUDE_DELTA,
    });
    setPosition(event.nativeEvent.coordinate);
    await getLocationAddress(event.nativeEvent.coordinate);
  }

  useEffect(() => {
    getCurrentUserLocation();

    return () => {
      setInitialPosition(undefined);
    };
  }, [getCurrentUserLocation]);

  return (
    <Box flex={1}>
      {position.latitude === 0 && (
        <Button style={styles.topButton} disabled={true}>
          <Text style={styles.nextButtonText}>Selecione um local no mapa</Text>
        </Button>
      )}
      <MapView
        initialRegion={initialPosition}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {position.latitude !== 0 && (
          <Marker
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {position.latitude !== 0 && (
        <Button
          style={styles.nextButton}
          onPress={handleNavigateToCreateLocation}
          disabled={!address}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </Button>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: theme.colors.orangePrimary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 20,
  },

  topButton: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    top: 40,
    zIndex: 3,
  },

  createBottom: {
    backgroundColor: theme.colors.orangePrimary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },

  nextButtonText: {
    fontSize: 16,
    color: '#FFF',
  },
});
