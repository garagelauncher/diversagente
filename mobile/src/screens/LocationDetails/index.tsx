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
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  Select,
  Spinner,
  Stack,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import { useCallback, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import { AppBar } from '@src/components/AppBar';
import { LoadingScreen } from '@src/components/LoadingScreen';
import { Location } from '@src/contracts/Location';
import { RatePeriod } from '@src/contracts/Review';
import { StackLocationNavigatorParamList } from '@src/routes/stacks/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { copyToClipBoard } from '@src/utils/copyToClipBoard';
import { formatDate } from '@src/utils/formatDate';
import { getIconProviderByName } from '@src/utils/getIconProvider';

type LocationDetailsScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'LocationDetails'
>;

export const LocationDetails = () => {
  const toast = useToast();
  const [ratePeriod, setRatePeriod] = useState<RatePeriod>('week');
  const [isLoading, setIsLoading] = useState(false);

  const [isCopyToClipboard, setIsCopyToClipboard] = useState(false);
  const [location, setLocation] = useState<Location>(
    null as unknown as Location,
  );

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

  const fetchLocationById = useCallback(
    async (locationId: string, ratePeriod: RatePeriod) => {
      const locationFromApi = await diversaGenteServices.getLocationById(
        locationId,
        ratePeriod,
      );
      setLocation(locationFromApi);
    },
    [],
  );

  const copyAddressToClipBoard = async (address: string) => {
    await copyToClipBoard(address);
    setIsCopyToClipboard(true);
    toast.show({
      description: 'Endereço copiado com sucesso!',
      background: 'green.500',
    });
  };

  useEffect(() => {
    console.log('LocationDetails', id);
    try {
      setIsLoading(true);
      fetchLocationById(id, ratePeriod);
    } finally {
      setIsLoading(false);
    }
  }, [fetchLocationById, id, ratePeriod]);

  if (!location) {
    return <LoadingScreen />;
  }
  console.debug(location);

  return (
    <Box width="100%" backgroundColor="gray.100" flex={1}>
      <AppBar />
      {isLoading && (
        <Spinner
          size={'lg'}
          position="absolute"
          left={'50%'}
          top={'50%'}
          zIndex={4}
        />
      )}
      {/* <Alert
        w="90%"
        status={'success'}
        position="absolute"
        bottom={10}
        zIndex={2}
        alignSelf="center"
      >
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.600">
                Texto copiado com sucesso
              </Text>
            </HStack>
            <IconButton
              variant="unstyled"
              _focus={{
                borderWidth: 0,
              }}
              icon={<Icon as={<Feather name="x" color="coolGray.600" />} />}
            />
          </HStack>
        </VStack>
      </Alert> */}

      <IconButton
        colorScheme="warmGray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={20}
        left={4}
        zIndex={1}
      />
      <Flex
        height={120}
        bg="blue.100"
        width={'100%'}
        alignItems="center"
        justifyContent="center"
        pt={3}
      >
        <IconButton
          variant={'ghost'}
          _icon={{
            as: getIconProviderByName(location.iconProvider),
            name: location.icon ?? 'map-pin',
            color: 'orange.500',
            size: '6xl',
          }}
        />
      </Flex>

      <ScrollView
        flex={1}
        padding={4}
        paddingBottom={40}
        _contentContainerStyle={{
          minW: '72',
        }}
      >
        <Stack space={2}>
          <Heading fontSize={24} fontWeight={'bold'} color={'gray.700'}>
            {location?.title}
          </Heading>

          <Flex marginTop={2}>
            <Flex
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Text fontSize={16} color={'gray.800'} fontWeight={'bold'}>
                Nota média:{'   '}
              </Text>
              <Text
                fontSize={location.starsAverage === null ? 16 : 32}
                color={'yellow.500'}
                fontWeight={'bold'}
              >
                {location.starsAverage === null
                  ? 'N/A - não avaliado no período'
                  : location.starsAverage}
              </Text>
            </Flex>
            <Flex
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              width="100%"
              mt={4}
            >
              <Text
                fontSize={16}
                color={'gray.800'}
                fontWeight={'bold'}
                flex={1}
              >
                Nota da(o) última(o):
              </Text>
              <Select
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                flex={1}
                selectedValue={ratePeriod}
                onValueChange={(value) => setRatePeriod(value as RatePeriod)}
              >
                <Select.Item label="Dia" value="day" />
                <Select.Item label="Semana" value="week" />
                <Select.Item label="Mês" value="month" />
                <Select.Item label="Ano" value="year" />
              </Select>
            </Flex>
          </Flex>
          <Flex mt={2}>
            <Text fontSize={16} color={'blue.500'} fontWeight={'bold'}>
              Criado na comunidade em
            </Text>
            <Text fontSize={14} color={'gray.800'}>
              {formatDate(location.createdAt)}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize={16} color={'blue.500'} fontWeight={'bold'}>
              Endereço
            </Text>
            <Flex
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text fontSize={14} color={'gray.800'}>
                {location.address}
              </Text>
              <IconButton
                colorScheme={'dark'}
                variant={isCopyToClipboard ? 'outlined' : 'ghost'}
                icon={<Icon as={<Feather name="clipboard" />} />}
                onPress={() => copyAddressToClipBoard(location.address)}
              />
            </Flex>
          </Flex>
          <Flex>
            <Text fontSize={16} color={'blue.500'} fontWeight={'bold'}>
              Descrição
            </Text>
            <Text fontSize={14} color={'gray.800'}>
              {location.description}
            </Text>
          </Flex>
        </Stack>
        <Divider my={4} />
        <Stack space={4} paddingBottom={30} marginTop={1}>
          <View
            borderRadius={20}
            overflow={'hidden'}
            borderWidth={1.2}
            borderColor={'#B3DAE2'}
            backgroundColor={'#E6F7FB'}
          >
            <MapView
              initialRegion={{
                latitude: location.coordinates.longitude,
                longitude: location.coordinates.latitude,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008,
              }}
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
                  latitude: location?.coordinates.longitude,
                  longitude: location?.coordinates.latitude,
                }}
              />
            </MapView>
            <TouchableOpacity
              onPress={() => handleOpenLocationOnGoogleMaps(location)}
              style={{
                padding: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text color="blue.800">Ver rotas no Google Maps</Text>
            </TouchableOpacity>
          </View>
          <VStack
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            space={2}
          >
            <Button
              fontWeight={'bold'}
              colorScheme="blue"
              onPress={handleNavigateToReviews}
              width={'48%'}
            >
              Ver avaliações
            </Button>
            <Button
              fontWeight={'bold'}
              colorScheme="orange"
              onPress={handleNavigateToFormCreateReview}
              width={'48%'}
            >
              Avaliar local
            </Button>
          </VStack>
        </Stack>
      </ScrollView>
    </Box>
  );
};
