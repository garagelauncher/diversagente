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
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';

import { Location } from '@src/contracts/Location';
import { StackLocationNavigatorParamList } from '@src/routes/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { formatDate } from '@src/utils/formatDate';

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

  const handleNavigateToReviews = () => {
    navigation.navigate('Reviews', { locationId: id });
  };

  const handleNavigateToFormCreateReview = () => {
    navigation.navigate('FormCreateReview', { locationId: id });
  };

  const handleOpenLocationOnGoogleMaps = (locationToOpen: Location) => {
    const { coordinates } = locationToOpen;
    console.log('locationToOpen');
    console.log(locationToOpen);
    const { latitude, longitude } = coordinates;
    console.log(latitude, longitude);
    const url = `https://www.google.com/maps/search/?api=1&query=${longitude},${latitude}`;
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
    <Box width="100%" backgroundColor="gray.200" flex={1}>
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={10}
        left={4}
        zIndex={1}
      />
      <Image
        source={{
          uri: `https://unsplash.it/400/200`,
        }}
        resizeMode={'cover'}
        width={'100%'}
        height={200}
        style={{
          backgroundColor: 'rgba(0, 0, 0, .5)',
        }}
      />
      <ScrollView
        flex={1}
        padding={4}
        paddingBottom={40}
        _contentContainerStyle={{
          minW: '72',
        }}
      >
        <Stack space={2}>
          <Heading fontSize={24} fontWeight={'bold'} color={'black'}>
            {location?.title}
          </Heading>
          <Text>
            Entrou para comunidade em: {formatDate(location?.createdAt)}
          </Text>
          <Text>{location?.address}</Text>
          <Text fontSize={14} color={'black'}>
            {location?.description}
          </Text>
        </Stack>
        <Stack space={4} paddingBottom={10} marginTop={10}>
          <Button
            fontWeight={'bold'}
            colorScheme="blue"
            onPress={() => handleOpenLocationOnGoogleMaps(location)}
          >
            Ver no Google Maps
          </Button>
          <Button
            fontWeight={'bold'}
            colorScheme="pink"
            onPress={handleNavigateToReviews}
          >
            Ver 1222 reviews
          </Button>
          <Button
            fontWeight={'bold'}
            colorScheme="orange"
            onPress={handleNavigateToFormCreateReview}
          >
            Avaliar local
          </Button>
        </Stack>
      </ScrollView>
    </Box>
  );
};
