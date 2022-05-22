import { Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { Box, Heading, Icon, IconButton, Text } from 'native-base';

import { StackLocationNavigatorParamList } from '@src/routes/locationStack.routes';

type LocationDetailsScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'LocationDetails'
>;

export const LocationDetails = () => {
  const navigation = useNavigation<LocationDetailsScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackLocationNavigatorParamList, 'LocationDetails'>>();
  const { id } = route.params;

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  return (
    <Box
      width="100%"
      backgroundColor="blue.200"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={10}
        left={10}
      />
      <Heading>Location details PAGE</Heading>
      <Text>Work In progress...</Text>
      <Text>{id}</Text>
    </Box>
  );
};
