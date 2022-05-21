import { useFocusEffect } from '@react-navigation/native';
import { Box, Heading, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, {
  Marker,
  Callout,
  Region,
  PROVIDER_GOOGLE,
} from 'react-native-maps';

import * as styles from './styles';

import { Location } from '@src/contracts/Location';
import { diversaGenteServices } from '@src/services/diversaGente';

export const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Region | undefined>(
    undefined,
  );

  useFocusEffect(() => {
    diversaGenteServices
      .getLocationsByProximity({
        latitude: -23.56498,
        longitude: -46.63327,
        distanceInKilometer: 10,
        limit: 10,
      })
      .then((foundLocations) => {
        setLocations(foundLocations);
      })
      .catch((error) => console.error('deu ruim'));
    console.debug('loaded focus on map');
  });

  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = 0.0421;

  useEffect(() => {
    setInitialPosition({
      latitude: -23.4521335,
      longitude: -46.63327,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }, []);

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
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: location.coordinates.latitude,
                longitude: location.coordinates.longitude,
              }}
            >
              <Callout tooltip={true}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{location.title}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </Box>
  );
};
