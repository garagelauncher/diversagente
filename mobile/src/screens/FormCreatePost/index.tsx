import {
  VStack,
  Button,
  FormControl,
  TextArea,
  Heading,
  HStack,
  Alert,
  Box,
  Center,
  CloseIcon,
  IconButton,
  TextField,
  Text,
  Divider,
} from 'native-base';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { logger } from '@src/utils/logger';

export const FormCreatePost = () => {
  logger.success('FormCreatePost');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('submiting with ', data);
  };

  return (
    <VStack space={4} marginTop="24" padding="8">
      <HStack alignContent={'center'} justifyContent="space-between">
        <Heading>Nova postagem</Heading>
        <CloseIcon marginTop="2" />
      </HStack>
      <Divider
        my="2"
        _light={{
          bg: 'muted.300',
        }}
        _dark={{
          bg: 'muted.50',
        }}
      />
      <Center>
        <Alert maxW="400" status="warning" colorScheme="orange">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between"
            >
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text>Antes de criar postagens</Text>
              </HStack>
            </HStack>
            <Box
              pl="6"
              _text={{
                color: 'coolGray.600',
              }}
            >
              <Text>
                We are happy to announce that we are going live on July 28th.
                Get ready!
              </Text>
            </Box>
          </VStack>
        </Alert>
      </Center>
      <FormControl isRequired isInvalid={'thought' in errors}>
        <FormControl.Label>What do you think?</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              placeholder="TextArea"
              onChangeText={(val) => onChange(val)}
              defaultValue={value}
              autoCompleteType="off"
            />
          )}
          name="thought"
          rules={{ required: 'Field is required', minLength: 3 }}
          defaultValue="I love NativeBase."
        />
        <FormControl.ErrorMessage>
          {errors.thought?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)} colorScheme="pink">
        Submit
      </Button>
    </VStack>
  );
};
