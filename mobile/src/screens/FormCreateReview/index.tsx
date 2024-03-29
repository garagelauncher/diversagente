import { Feather } from '@expo/vector-icons';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {
  Box,
  FormControl,
  Heading,
  Icon,
  IconButton,
  Text,
  Stack,
  Button,
  TextArea,
  VStack,
  ScrollView,
} from 'native-base';
import React, { useState } from 'react';
import { AirbnbRating } from 'react-native-ratings';

import { AppBar } from '@src/components/AppBar';
import { Review } from '@src/contracts/Review';
import { useAuth } from '@src/hooks/useAuth';
import { StackLocationNavigatorParamList } from '@src/routes/stacks/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';

type FormCreateReviewScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'FormCreateReview'
>;

export const FormCreateReview = () => {
  const { user } = useAuth();

  const [reviewText, setReviewText] = useState('');
  const [reviewRate, setReviewRate] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const isAllowedToSubmit =
    reviewText.length > 0 && !isLoading && reviewRate > 0;

  const navigation = useNavigation<FormCreateReviewScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackLocationNavigatorParamList, 'FormCreateReview'>>();
  const { locationId } = route.params;

  const createReview = async () => {
    const review: Partial<Review> = {
      text: reviewText,
      stars: reviewRate,
      ownerId: String(user?.id),
    };

    await diversaGenteServices.createReviewToLocation(locationId, review);
  };

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const ratingCompleted = (rating: number) => {
    console.log('Rating is: ' + rating);
    setReviewRate(rating);
  };
  const textValue = (text: string) => {
    console.log(text);
    setReviewText(text);
  };

  // const validate = () => {
  //   if (reviewText === undefined) {
  //     setErrors({ ...errors, review: 'Campo obrigatório' });
  //     return false;
  //   } else if (reviewText.length < 3) {
  //     setErrors({
  //       ...errors,
  //       review: 'Sua avalição precisa ter pelo menos 3 caracteres.',
  //     });
  //     return false;
  //   }

  //   return true;
  // };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // validate() ? console.log('Submitted') : console.log('Validation Failed');
      await createReview();
      console.log(reviewText);
      console.log(reviewRate);
      navigation.navigate('LocationDetails', {
        id: locationId,
      });
    } catch (error) {
      console.error('FormCreateReview: handleSubmit: error: reviewText: ');
    } finally {
      console.debug('FormCreateReview: handleSubmit: finally: reviewText: ');
      setIsLoading(false);
    }
  };

  return (
    <ScrollView w="100%" flex={1} pb={10}>
      <AppBar />
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={3}
        ml={4}
        mb={2}
        zIndex={1}
      />
      <Heading fontSize={30} alignSelf={'center'} mt={3} mb={4}>
        Avaliar local
      </Heading>
      <VStack>
        <FormControl px={9}>
          <Stack space={5}>
            <FormControl.Label mb={5}>
              <Text fontSize={22}> Como foi a sua experiência? </Text>
            </FormControl.Label>
            <TextArea
              bg={'warning.50'}
              p={5}
              h={200}
              fontSize={16}
              placeholder="Conte aqui o que achou desse local!"
              maxW="100%"
              autoCompleteType={undefined}
              onChangeText={textValue}
            />
          </Stack>
          <Stack mt={4}>
            <FormControl.Label>
              <Heading>Dê uma nota: </Heading>
            </FormControl.Label>
            <AirbnbRating
              defaultRating={0}
              selectedColor="#d6c103"
              showRating={true}
              onFinishRating={ratingCompleted}
              reviews={['Ruim', 'Regular', 'Bom', 'Muito bom', 'Excelente']}
            />
          </Stack>
          <Button
            borderRadius={20}
            mt={10}
            onPress={handleSubmit}
            colorScheme={isAllowedToSubmit ? 'orange' : 'gray'}
            disabled={!isAllowedToSubmit}
            isLoading={isLoading}
          >
            <Text fontSize={20} color={'white'}>
              Enviar avaliação
            </Text>
          </Button>
        </FormControl>
      </VStack>
    </ScrollView>
  );
};
