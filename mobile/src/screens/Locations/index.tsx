import { SimpleLineIcons } from '@expo/vector-icons';
import * as ExpoLocation from 'expo-location';
import { Box, Button, Icon, Image, Popover, Text, View } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';

import * as customStyles from './styles';

import { Location } from '@src/contracts/Location';
import { diversaGenteServices } from '@src/services/diversaGente';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export const Locations = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Region | undefined>(
    undefined,
  );

  console.log('locations state', locations);

  const getUserCurrentLocation = useCallback(async () => {
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
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }, []);

  const fetchLocations = useCallback(async () => {
    diversaGenteServices
      .getLocationsByProximity({
        latitude: -23.4448752,
        longitude: -46.5374598,
        distanceInKilometer: 30,
        limit: 10,
      })
      .then((foundLocations) => {
        console.debug('foundLocations');
        console.debug(foundLocations);
        setLocations(foundLocations);
      })
      .catch((error) => console.error('deu ruim'));
  }, []);

  useEffect(() => {
    setInitialPosition({
      latitude: -23.4521335,
      longitude: -46.63327,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    console.debug('loaded focus on map');

    fetchLocations();
    getUserCurrentLocation();
  }, [fetchLocations, getUserCurrentLocation]);

  return (
    <Box flex={1}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={customStyles.mapStyles}
        initialRegion={initialPosition}
      >
        {locations.map((location) => {
          return (
            <Marker
              key={location.id}
              style={styles.mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: location.coordinates.latitude,
                longitude: location.coordinates.longitude,
              }}
            >
              {/* <Box background={'blue.400'} borderRadius={5} minWidth={300}>
                <Icon
                  as={<SimpleLineIcons name={'graduation'} color="white" />}
                  color="white"
                  size={12}
                  width={'100%'}
                  background={'blue.900'}
                />
                <Text
                  color="white"
                  lineBreakMode={'tail'}
                  textBreakStrategy="balanced"
                >
                  {location.title}
                </Text>
                <Box style={styles.mapPicker} />
              </Box> */}

              <Box h="60%" w="100%" alignItems="center">
                <Popover
                  isOpen={isPopoverOpen}
                  trigger={(triggerProps) => {
                    return (
                      <Button
                        {...triggerProps}
                        colorScheme="danger"
                        onPress={() => setIsPopoverOpen(!isPopoverOpen)}
                      >
                        Delete Customer
                      </Button>
                    );
                  }}
                >
                  <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                    <Popover.Arrow />
                    <Popover.CloseButton />
                    <Popover.Header>Delete Customer</Popover.Header>
                    <Popover.Body>
                      This will remove all data relating to Alex. This action
                      cannot be reversed. Deleted data can not be recovered.
                    </Popover.Body>
                    <Popover.Footer justifyContent="flex-end">
                      <Button.Group space={2}>
                        <Button colorScheme="coolGray" variant="ghost">
                          Cancel
                        </Button>
                        <Button colorScheme="danger">Deletei</Button>
                      </Button.Group>
                    </Popover.Footer>
                  </Popover.Content>
                </Popover>
              </Box>
            </Marker>
          );
        })}
      </MapView>
    </Box>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 300,
    height: 150,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});
