import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  VStack,
  Button,
  Heading,
  HStack,
  Alert,
  Box,
  CloseIcon,
  IconButton,
  Text,
  Divider,
  Icon,
  FormControl,
  Select,
  CheckIcon,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';

import { ControlledInput } from '@src/components/ControlledInput';
import { logger } from '@src/utils/logger';

type CreatePostFormData = {
  title: string;
  content: string;
  category: string;
  subcategory: string;
  image?: string;
  imageDescription?: string;
};

const schema = yup.object({
  title: yup
    .string()
    .trim()
    .max(40, 'O título só pode ter até 40 caracteres.')
    .required('Título é obrigatório.'),
  content: yup
    .string()
    .trim()
    .min(140, 'Mínimo de 140 caracteres')
    .max(1800, 'Mínimo de 6 caracteres')
    .required('Conteúdo é obrigatório.'),
  imageDescription: yup
    .string()
    .notRequired()
    .min(8, 'Mínimo de 140 caracteres')
    .max(200, 'Máximo de 200 caracteres.')
    .transform((value) => (value ? value : null))
    .nullable(),
  category: yup.string().required(),
  subcategory: yup.string().required(),
  image: yup.string(),
});

export const FormCreatePost = () => {
  logger.success('FormCreatePost');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: CreatePostFormData) => {
    console.log('submiting with ', data);
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack space={4} marginTop="16" padding="8">
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
                  <Text fontSize="16" fontWeight="medium">
                    Antes de criar postagens
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: 'coolGray.600',
                  }}
                />
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: 'coolGray.600',
                }}
              >
                <Text>
                  Lembre-se de ser respeitoso e de que essa comunidade é voltada
                  para ajudar pais, familiares e amigos de crianças
                  neurodiversas.
                </Text>
              </Box>
            </VStack>
          </Alert>

          <Controller
            control={control}
            name="category"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl
                w="100%"
                isRequired
                isInvalid={errors.category ? true : false}
              >
                <FormControl.Label>Selecione a categoria</FormControl.Label>
                <Select
                  borderColor={value?.length ? 'green.500' : 'gray.400'}
                  minWidth="200"
                  accessibilityLabel="Selecione uma categoria"
                  placeholder="Selecione uma categoria"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  onValueChange={onChange}
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
                {errors.category && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    <Text>Categoria é obrigatória.</Text>
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          ></Controller>

          <Controller
            control={control}
            name="subcategory"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <FormControl
                w="100%"
                isRequired
                isDisabled={true}
                isInvalid={errors.subcategory ? true : false}
              >
                <FormControl.Label>Selecione a subcategoria</FormControl.Label>
                <Select
                  borderColor={value?.length ? 'green.500' : 'gray.400'}
                  minWidth="200"
                  accessibilityLabel="Selecione uma categoria"
                  placeholder="Selecione uma categoria"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  mt="1"
                  onValueChange={onChange}
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
                {errors.subcategory && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    <Text>Subctegoria é obrigatória.</Text>
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          ></Controller>

          <ControlledInput
            control={control}
            name="title"
            label={'Título'}
            error={errors.title}
            isTextArea={false}
            placeholder="Máximo de 40 caracteres."
          ></ControlledInput>

          <ControlledInput
            control={control}
            name="content"
            label={'Conteúdo'}
            error={errors.content}
            isTextArea={true}
            placeholder="Máximo de 1800 caracteres."
          ></ControlledInput>

          <ControlledInput
            control={control}
            name="imageDescription"
            label={'Imagem'}
            error={errors.imageDescription}
            isTextArea={false}
            hasImage={true}
            placeholder="Descrição textual, máximo de 200 caracteres."
          ></ControlledInput>

          <Controller
            control={control}
            name={'image'}
            rules={{ required: true }}
            render={({ field: { value } }) => (
              <FormControl w="100%" isRequired isInvalid={value ? false : true}>
                <HStack alignContent={'center'} justifyContent="space-between">
                  <Text>Formatos aceitos: png e jpg.</Text>
                  <Button
                    width="32"
                    leftIcon={
                      <Icon
                        as={Ionicons}
                        name="cloud-upload-outline"
                        size="sm"
                      />
                    }
                  >
                    Upload
                  </Button>
                </HStack>
                {errors.image && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    <Text>-.</Text>
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
          ></Controller>

          <HStack width="100%" marginTop="8" justifyContent="space-between">
            <Button
              width="40"
              colorScheme="blue"
              variant="outline"
              borderColor="blue.500"
            >
              Cancelar
            </Button>
            <Button
              width="40"
              onPress={handleSubmit(onSubmit)}
              colorScheme="blue"
              type="submit"
            >
              Criar
            </Button>
          </HStack>
        </VStack>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
