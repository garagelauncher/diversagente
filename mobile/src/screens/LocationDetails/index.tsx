import { Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
} from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { Location } from '@src/contracts/Location';
import { StackLocationNavigatorParamList } from '@src/routes/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';

type LocationDetailsScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'LocationDetails'
>;

export const LocationDetails = () => {
  const [location, setLocation] = useState<Location>({} as Location);

  const navigation = useNavigation<LocationDetailsScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackLocationNavigatorParamList, 'LocationDetails'>>();
  const { id } = route.params;

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const handleOpenLocationOnGoogleMaps = (locationToOpen: Location) => {
    const { coordinates } = locationToOpen;
    console.log('locationToOpen');
    console.log(locationToOpen);
    const { latitude, longitude } = coordinates;
    console.log(latitude, longitude);
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const fetchLocationById = useCallback(async (locationId: string) => {
    const locationFromApi = await diversaGenteServices.getLocationById(
      locationId,
    );
    setLocation(locationFromApi);
  }, []);

  useEffect(() => {
    console.log('LocationDetails', id);
    fetchLocationById(id);
  }, [fetchLocationById, id]);

  return (
    <Box width="100%" backgroundColor="blue.200" flex={1}>
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={10}
        left={10}
        zIndex={1}
      />
      <Image
        source={{
          uri: `https://unsplash.it/400/200`,
        }}
        resizeMode={'cover'}
        width={'100%'}
        height={200}
      />
      <Box flex={1} padding={4}>
        <Text>{id}</Text>
        <Heading>{location?.title}</Heading>
        <Text>{location?.description}</Text>
        <Text>{location?.address}</Text>
        <Text>{location?.createdAt}</Text>
        <Button
          colorScheme="blue"
          onPress={() => handleOpenLocationOnGoogleMaps(location)}
        >
          Ver no Google Maps
        </Button>
      </Box>
    </Box>
  );
};
