import { SimpleLineIcons, Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import * as ExpoLocation from 'expo-location';
import {
  Box,
  FormControl,
  Icon,
  IconButton,
  Input,
  Modal,
  Spinner,
  Text,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';

import * as customStyles from './styles';

import { Location } from '@src/contracts/Location';
import { StackLocationNavigatorParamList } from '@src/routes/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';

type LocationScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'Locations'
>;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export const Locations = () => {
  const [showModal, setShowModal] = useState(false);
  const [isFetchingLocations, setIsFetchingLocations] = useState(false);
  const [radius, setRadius] = useState(10);
  const [quantity, setQuantity] = useState(50);
  const [locations, setLocations] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Region | undefined>(
    undefined,
  );

  const navigation = useNavigation<LocationScreenNavigationProps>();

  console.log('locations state', locations);

  function handleNavigateToLocationDetails(id: string) {
    console.log('handleNavigateToLocationDetails', id);
    navigation.navigate('LocationDetails', { id });
  }

  function handleNavigateToFormCreateLocation() {
    navigation.navigate('FormCreateLocation');
  }

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
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  }, []);

  const fetchLocations = useCallback(async () => {
    setIsFetchingLocations(true);
    try {
      const foundLocations = await diversaGenteServices.getLocationsByProximity(
        {
          latitude: -23.4448752,
          longitude: -46.5374598,
          distanceInKilometer: radius,
          limit: quantity,
        },
      );
      console.debug('foundLocations');
      console.debug(foundLocations);
      setLocations(foundLocations);
    } catch (error) {
      console.error(error);
      console.error('deu ruim');
    } finally {
      setIsFetchingLocations(false);
    }
  }, [quantity, radius]);

  // useEffect(() => {}, [fetchLocations, getCurrentUserLocation]);

  const onOpenLocationTab = useCallback(async () => {
    console.debug('loaded focus on map');

    await getCurrentUserLocation();
    await fetchLocations();
  }, [getCurrentUserLocation, fetchLocations]);

  const onOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const onCloseModal = useCallback(async () => {
    setShowModal(false);
    await onOpenLocationTab();
  }, [onOpenLocationTab]);

  useEffect(() => {
    onOpenLocationTab();
  }, [onOpenLocationTab]);

  return (
    <Box flex={1}>
      <Modal isOpen={showModal} onClose={onCloseModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Filtros</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Quantidade</FormControl.Label>
              <Input
                value={String(quantity)}
                onChangeText={(text) => setQuantity(Number(text || 10))}
                keyboardType="numeric"
                placeholder="Quantidade de lugares"
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Raio em Km</FormControl.Label>
              <Input
                value={String(radius)}
                onChangeText={(text) => setRadius(Number(text || 10))}
                keyboardType="numeric"
                placeholder="Raio em Km"
              />
            </FormControl>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <IconButton
        colorScheme="blue"
        variant={'solid'}
        icon={<Icon as={<Feather name="filter" />} />}
        onPress={onOpenModal}
        position="absolute"
        top={16}
        right={4}
        zIndex={1}
      />
      {isFetchingLocations && (
        <Spinner
          size={'lg'}
          position="absolute"
          left={'50%'}
          top={'50%'}
          zIndex={1}
        />
      )}
      <IconButton
        colorScheme="orange"
        variant={'solid'}
        icon={<Icon as={<Feather name="plus" />} />}
        onPress={handleNavigateToFormCreateLocation}
        position="absolute"
        bottom={8}
        left={4}
        zIndex={1}
      />

      <MapView
        provider={PROVIDER_GOOGLE}
        style={customStyles.mapStyles}
        initialRegion={initialPosition}
      >
        {locations.map((location) => {
          return (
            <Marker
              key={location.id}
              style={customStyles.mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: location.coordinates.latitude,
                longitude: location.coordinates.longitude,
              }}
              onPress={() => handleNavigateToLocationDetails(location.id)}
            >
              <Box
                width={200}
                minHeight={70}
                backgroundColor="blue.800"
                borderRadius="md"
                alignItems="center"
                position="relative"
                zIndex={2}
              >
                {/* <Image
                  width="100%"
                  height={60}
                  resizeMode={'cover'}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1653220329192-ce4d725d352a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740',
                  }}
                  zIndex={2}
                  borderTopLeftRadius="md"
                  borderTopRightRadius="md"
                /> */}
                <Box
                  width="100%"
                  height={60}
                  // resizeMode={'cover'}
                  // source={{
                  //   uri: 'https://images.unsplash.com/photo-1653220329192-ce4d725d352a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740',
                  // }}
                  zIndex={2}
                  borderTopLeftRadius="md"
                  borderTopRightRadius="md"
                  alignItems="center"
                  justifyContent="center"
                  backgroundColor="blue.400"
                >
                  <Feather name="cloud" size={40} color="white" />
                </Box>
                <Text
                  flex={2}
                  color={'#FFF'}
                  fontSize={13}
                  lineHeight={23}
                  zIndex={2}
                  lineBreakMode="tail"
                  textAlign="center"
                  numberOfLines={1}
                  marginX={2}
                >
                  {location.title}
                </Text>
                <Box
                  backgroundColor="blue.800"
                  position="absolute"
                  width={8}
                  height={8}
                  style={{
                    transform: [{ rotate: '45deg' }],
                  }}
                  bottom={-8}
                  margin={0}
                  zIndex={1}
                />
              </Box>
            </Marker>
          );
        })}
      </MapView>
    </Box>
  );
};
