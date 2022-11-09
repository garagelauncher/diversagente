import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as ExpoLocation from 'expo-location';
import {
  Box,
  FormControl,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  Spinner,
  Text,
  useToast,
  VStack,
  Alert as NativeBaseAlert,
  Heading,
  Flex,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';

import * as customStyles from './styles';

import { AppBar } from '@src/components/AppBar';
import { ConditionallyRender } from '@src/components/ConditionallyRender';
import { Location } from '@src/contracts/Location';
import { translate } from '@src/i18n';
import { StackLocationNavigatorParamList } from '@src/routes/stacks/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { getIconProviderByName } from '@src/utils/getIconProvider';

type LocationScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'Locations'
>;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export const Locations = () => {
  const toast = useToast();
  const [isWelcomeLocationOpen, setIsWelcomeLocationOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isFetchingLocations, setIsFetchingLocations] = useState(false);
  const [radius, setRadius] = useState(20);
  const [quantity, setQuantity] = useState(10);
  const [locations, setLocations] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Region | undefined>(
    undefined,
  );

  const navigation = useNavigation<LocationScreenNavigationProps>();

  function handleNavigateToLocationDetails(id: string) {
    navigation.navigate('LocationDetails', { id });
  }

  function handleNavigateToSelectLocationMap() {
    navigation.navigate('SelectLocationMap');
  }

  async function handleCloseWelcomeLocation() {
    setIsWelcomeLocationOpen(false);
    await AsyncStorage.setItem('diversagente@welcomeLocation', 'false');
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

    return { latitude, longitude };
  }, []);

  const fetchLocations = useCallback(
    async (position: { latitude: number; longitude: number } | undefined) => {
      setIsFetchingLocations(true);
      try {
        const foundLocations =
          await diversaGenteServices.getLocationsByProximity({
            latitude: position?.latitude ?? 0,
            longitude: position?.longitude ?? 0,
            distanceInKilometer: radius,
            limit: quantity,
          });
        setLocations(foundLocations);
      } catch (error) {
        console.error(error);
        toast.show({
          description: 'Erro ao buscar locais próximos',
          backgroundColor: 'red.500',
        });
      } finally {
        setIsFetchingLocations(false);
      }
    },
    [quantity, radius, toast],
  );

  const onOpenLocationTab = useCallback(async () => {
    console.debug('loaded focus on map');

    const coordinates = await getCurrentUserLocation();
    await fetchLocations(coordinates);
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

    return () => {
      setInitialPosition(undefined);
    };
  }, [onOpenLocationTab]);

  useEffect(() => {
    async function checkWelcomeLocation() {
      const welcomeLocation = await AsyncStorage.getItem(
        'diversagente@welcomeLocation',
      );
      if (!welcomeLocation) {
        setIsWelcomeLocationOpen(true);
      }
    }

    checkWelcomeLocation();
  }, []);

  return (
    <Box flex={1}>
      <ConditionallyRender
        condition={isWelcomeLocationOpen}
        trueComponent={
          <NativeBaseAlert
            w="90%"
            status={'info'}
            position="absolute"
            top={'40%'}
            zIndex={2}
            alignSelf="center"
          >
            <VStack space={2} flexShrink={1} w="100%">
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading>Locais próximos avaliados</Heading>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<Icon as={<Feather name="x" color="coolGray.600" />} />}
                  onPress={handleCloseWelcomeLocation}
                />
              </Flex>
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <Text fontSize="md" color="coolGray.600">
                  Aqui você encontra locais próximos para serem avaliados pela
                  comunidade neurodiversa do diversaGente!
                </Text>
              </HStack>
              <Text fontSize="md" color="coolGray.400">
                Você pode criar novos locais, visualizar resenhas e dar sua
                própria avaliação com uma nota de 1 a 5 estrelas. Os ícones dos
                locais simbolizam a sua categoria que é aderente as demais
                categorias do app.
              </Text>
            </VStack>
          </NativeBaseAlert>
        }
        falseComponent={null}
      ></ConditionallyRender>

      <Modal isOpen={showModal} onClose={onCloseModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{translate('filters')}</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Quantidade de locais</FormControl.Label>
              <Input
                value={String(quantity)}
                onChangeText={(text) => setQuantity(Number(text || 10))}
                keyboardType="numeric"
                placeholder="Quantidade de lugares"
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Raio em quilômetro</FormControl.Label>
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

      <AppBar position="absolute" top={0} left={0} right={0} zIndex={1} />

      <IconButton
        colorScheme="blue"
        variant={'solid'}
        icon={<Icon as={<Feather name="filter" />} />}
        onPress={onOpenModal}
        position="absolute"
        top={10}
        right={4}
        zIndex={1}
      />

      {isFetchingLocations && (
        <Spinner
          size={'lg'}
          position="absolute"
          alignSelf="center"
          mt="49%"
          color="orange.500"
          zIndex={1}
        />
      )}
      <IconButton
        colorScheme="orange"
        variant={'solid'}
        icon={<Icon as={<Feather name="plus" />} />}
        onPress={handleNavigateToSelectLocationMap}
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
                  <IconButton
                    variant={'ghost'}
                    size={'lg'}
                    _icon={{
                      as: getIconProviderByName(location.iconProvider),
                      name: location.icon ?? 'map-pin',
                      color: 'white',
                    }}
                  />
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
