import { SimpleLineIcons } from '@expo/vector-icons';
import { Box, Icon, Text } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';

import * as styles from './styles';

import { Category } from '@src/contracts/Category';
import { Location } from '@src/contracts/Location';
import { diversaGenteServices } from '@src/services/diversaGente';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Region | undefined>(
    undefined,
  );

  console.log('locations state', locations);

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
  }, [fetchLocations]);

  return (
    <Box flex={1}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyles}
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
              <Box background={'blue.400'} borderRadius={5} minWidth={300}>
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
              </Box>
            </Marker>
          );
        })}
      </MapView>
    </Box>
  );
};
