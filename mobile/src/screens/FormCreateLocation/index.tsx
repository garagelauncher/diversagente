import { Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import * as ExpoLocation from 'expo-location';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, Linking, StyleSheet } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { LatLng, MapEvent, Marker, Region } from 'react-native-maps';

import { StackLocationNavigatorParamList } from '@src/routes/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { theme } from '@src/styles/theme';

type FormCreateLocationScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'FormCreateLocation'
>;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export const FormCreateLocation = () => {
  const navigation = useNavigation<FormCreateLocationScreenNavigationProps>();

  // form state
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');

  const [isSelectingLocation, setIsSelectingLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<Region | undefined>(
    undefined,
  );
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

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

  const onSelectLocation = useCallback(
    async (
      value: boolean,
      event?: {
        latitude: number;
        longitude: number;
      },
    ) => {
      setIsSelectingLocation(value);

      if (event) {
        const locationData = await ExpoLocation.reverseGeocodeAsync(event);

        let newAddress = '';
        for (const item of locationData) {
          newAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        }

        setAddress(newAddress);
      }
    },
    [],
  );

  function handleSelectMapPosition(event: MapEvent) {
    setInitialPosition({
      ...event.nativeEvent.coordinate,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
    setPosition(event.nativeEvent.coordinate);
  }

  async function createLocation() {
    const location = {
      title,
      description,
      address,
      coordinates: {
        latitude: position.latitude,
        longitude: position.longitude,
      },
    };

    await diversaGenteServices.createLocation(location);
    navigation.navigate('Locations');
  }

  useEffect(() => {
    getCurrentUserLocation();

    return () => {
      setInitialPosition(undefined);
    };
  }, [getCurrentUserLocation]);

  const shouldNotActiveForm = !title || !description || !address;

  if (isSelectingLocation) {
    return (
      <Box flex={1}>
        <MapView
          initialRegion={initialPosition}
          style={styles.mapStyle}
          onPress={handleSelectMapPosition}
        >
          {position.latitude === 0 && (
            <Button
              style={styles.topButton}
              onPress={() => onSelectLocation(false, position)}
              disabled={true}
            >
              <Text style={styles.nextButtonText}>Selecione um local</Text>
            </Button>
          )}

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
          <RectButton
            style={styles.nextButton}
            onPress={() => onSelectLocation(false, position)}
          >
            <Text style={styles.nextButtonText}>Próximo</Text>
          </RectButton>
        )}
      </Box>
    );
  }

  return (
    <Box width="100%" backgroundColor="gray.100" flex={1}>
      <ScrollView
        flex={1}
        padding={4}
        paddingBottom={40}
        _contentContainerStyle={{
          minW: '72',
        }}
        paddingTop={10}
      >
        <VStack space={4}>
          <Heading color="gray.900">Criar um novo local</Heading>

          <View
            borderRadius={20}
            overflow={'hidden'}
            borderWidth={1.2}
            borderColor={'#B3DAE2'}
            backgroundColor={'#E6F7FB'}
          >
            <MapView
              initialRegion={initialPosition}
              zoomEnabled={false}
              pitchEnabled={false}
              scrollEnabled={false}
              rotateEnabled={false}
              style={{
                width: '100%',
                height: 150,
              }}
            >
              {initialPosition && <Marker coordinate={initialPosition} />}
            </MapView>
            <TouchableOpacity
              onPress={() => onSelectLocation(true)}
              style={{
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text color="blue.800">Selecionar localização</Text>
            </TouchableOpacity>
          </View>

          <Flex>
            <Text fontSize={16} color={'blue.500'} fontWeight={'bold'}>
              Título do lugar*
            </Text>

            <Input
              placeholder="Título do lugar"
              value={title}
              onChangeText={(text) => setTitle(text)}
              fontSize={14}
              color={'gray.800'}
              marginTop={4}
            />
          </Flex>

          <Flex>
            <Text fontSize={16} color={'blue.500'} fontWeight={'bold'}>
              Descrição
            </Text>
            <Input
              placeholder="Descrição"
              value={description}
              onChangeText={(text) => setDescription(text)}
              fontSize={14}
              color={'gray.800'}
              marginTop={4}
            />
          </Flex>

          <Flex>
            <Text fontSize={16} color={'blue.500'} fontWeight={'bold'}>
              Endereço
            </Text>
            <Input
              disabled={true}
              placeholder="Endereço"
              value={address}
              fontSize={14}
              color={'gray.800'}
              marginTop={4}
            />
          </Flex>

          <Button
            style={{
              ...styles.createBottom,
              backgroundColor: shouldNotActiveForm
                ? 'gray'
                : theme.colors.navyPrimary,
              marginTop: 20,
            }}
            onPress={() => createLocation()}
            disabled={shouldNotActiveForm}
          >
            <Text style={styles.nextButtonText}>Criar local</Text>
          </Button>
        </VStack>
      </ScrollView>
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
    bottom: 40,
  },

  topButton: {
    backgroundColor: theme.colors.pastelPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    top: 40,
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
