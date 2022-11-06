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
  Select,
  Text,
  View,
  VStack,
  CheckIcon,
} from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, Region } from 'react-native-maps';

import { baseCoordinates } from '@src/configs';
import { Category } from '@src/contracts/Category';
import { useAuth } from '@src/hooks/useAuth';
import { StackLocationNavigatorParamList } from '@src/routes/stacks/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { theme } from '@src/styles/theme';

type FormCreateLocationScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'FormCreateLocation'
>;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

export const FormCreateLocation = () => {
  const { user } = useAuth();
  const navigation = useNavigation<FormCreateLocationScreenNavigationProps>();

  const route =
    useRoute<
      RouteProp<StackLocationNavigatorParamList, 'FormCreateLocation'>
    >();
  const { address: selectedAddress, coordinates: selectedLocation } =
    route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  const [initialPosition, setInitialPosition] = useState<Region | undefined>({
    ...selectedLocation,
    latitudeDelta: baseCoordinates.LATITUDE_DELTA,
    longitudeDelta: baseCoordinates.LONGITUDE_DELTA,
  });

  const [isLoading, setIsLoading] = useState(false);

  const shouldNotActiveForm =
    !title || !description || !selectedAddress || !category;

  const handleNavigateToSelectMapLocation = () => {
    navigation.navigate('SelectLocationMap');
  };

  const fetchAllCategories = useCallback(async () => {
    try {
      const categoriesFromApi = await diversaGenteServices.findAllCategories();
      setCategories(categoriesFromApi.results);
    } catch (error) {
      console.info('Error while fetching all categories', error);
    }
  }, []);

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

  async function createLocation() {
    setIsLoading(true);
    try {
      const location = {
        title,
        description,
        address: selectedAddress,
        coordinates: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
        ownerId: String(user?.id),
        categoryId: category?.id,
        icon: category?.icon,
        iconProvider: category?.iconProvider,
      };

      await diversaGenteServices.createLocation(location);
      navigation.navigate('Locations');
    } catch (error) {
      console.error('failed to create');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCurrentUserLocation();
    fetchAllCategories();

    return () => {
      setInitialPosition(undefined);
    };
  }, [getCurrentUserLocation, fetchAllCategories]);

  const updateCategoryIdSelected = (category: Category) => {
    setCategory(category);
  };

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
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
                calloutAnchor={{
                  x: 2.7,
                  y: 0.8,
                }}
                style={{
                  borderRadius: 10,
                  maxWidth: 300,
                  maxHeight: 500,
                  minHeight: 100,
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              />
            </MapView>
            <TouchableOpacity
              onPress={handleNavigateToSelectMapLocation}
              style={{
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text color="blue.800">Mudar localização</Text>
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
              Descrição*
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
              Endereço*
            </Text>
            <Input
              disabled={true}
              placeholder="Endereço"
              value={selectedAddress}
              fontSize={14}
              color={'gray.800'}
              marginTop={4}
            />
          </Flex>

          <Flex>
            <Text fontSize={16} color={'blue.500'} fontWeight={'bold'}>
              Categoria*
            </Text>
            <Select
              borderColor={'blue.800'}
              minWidth="200"
              accessibilityLabel="Selecione uma categoria"
              placeholder="Selecione uma categoria"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
            >
              {categories.map((category) => {
                return (
                  <Select.Item
                    key={category.id}
                    label={category.title}
                    value={category.id}
                    onPressIn={() => updateCategoryIdSelected(category)}
                  />
                );
              })}
            </Select>
          </Flex>

          <Button
            style={{
              ...styles.createBottom,
              backgroundColor: shouldNotActiveForm ? 'gray' : 'navy',
              marginTop: 20,
              marginBottom: 40,
            }}
            onPress={() => createLocation()}
            disabled={shouldNotActiveForm && !isLoading}
            isLoading={isLoading}
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
    backgroundColor: 'orange',
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
    backgroundColor: theme.colors.infoBoxColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    top: 40,
  },

  createBottom: {
    backgroundColor: 'orange',
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
