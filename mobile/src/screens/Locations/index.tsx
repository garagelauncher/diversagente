import { SimpleLineIcons } from '@expo/vector-icons';
import { Box, Icon, Text } from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';

import * as styles from './styles';

import { Location } from '@src/contracts/Location';
import { diversaGenteServices } from '@src/services/diversaGente';

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

  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.0421;

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
              <Box background={'#000'} borderRadius={5} padding={10}>
                <Icon
                  as={<SimpleLineIcons name="pencil" size={24} color="white" />}
                  color="white"
                  size={5}
                  ml="2"
                  width={'100%'}
                />
                <Box style={styles.mapMarkerIcon} />
                <Text color="white">{location.title}</Text>
                <Box style={styles.mapPicker} />
              </Box>
            </Marker>
          );
        })}
      </MapView>
    </Box>
  );
};
