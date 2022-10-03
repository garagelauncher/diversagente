import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
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
} from 'native-base';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import * as yup from 'yup';

import { ControlledInput } from '@src/components/ControlledInput';
import { PostForm } from '@src/contracts/Post';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { logger } from '@src/utils/logger';

type FormCreatePostNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'FormCreatePost'
>;

type CreatePostFormData = {
  title: string;
  content: string;
  category?: string;
  subcategory?: string;
  image?: string;
  imageDescription?: string;
};

const schema = yup.object({
  title: yup
    .string()
    .min(6, 'O título deve conter no mínimo 6 caracteres.')
    .max(40, 'O título deve conter no máximo 40 caracteres.')
    .required('Título é obrigatório.'),
  content: yup
    .string()
    .min(140, 'O conteúdo deve conter no mínimo 140 caracteres')
    .max(1800, 'O conteúdo deve conter no máximo 1800 caracteres')
    .required('Conteúdo é obrigatório.'),
  // image: yup.string().optional(),
  // imageDescription: yup
  // .string()
  // .trim()
  // .optional()
  // .min(8, 'Mínimo de 140 caracteres')
  // .max(200, 'Máximo de 200 caracteres.')
  // .transform((value) => (value ? value : null))
  // .nullable(),
  // category: yup.string().optional(),
  // subcategory: yup.string().optional(),
});

export const FormCreatePost = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const navigation = useNavigation<FormCreatePostNavigationProps>();

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
    createPost(data);
  };

  const handleOnClose = () => {
    setIsClosed(true);
  };

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  async function createPost(
    data: CreatePostFormData,
  ): Promise<PostForm | undefined> {
    setIsLoading(true);
    try {
      const createdPost = await diversaGenteServices.createPost({
        ...data,
        ownerId: String(user?.id),
      });
      navigation.navigate('Forum');
      return createdPost;
    } catch (error) {
      console.error('failed to create');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <VStack space={4} marginTop="16" padding="8">
            <HStack alignContent={'center'} justifyContent="space-between">
              <Heading>Nova postagem</Heading>
              <CloseIcon onPress={handleNavigateGoBack} marginTop="2" />
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

            {!isClosed && (
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
                      onPress={handleOnClose}
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
                      Lembre-se de ser respeitoso e de que essa comunidade é
                      voltada para ajudar pais, familiares e amigos de crianças
                      neurodiversas.
                    </Text>
                  </Box>
                </VStack>
              </Alert>
            )}

            <Box>
              {/**<Controller
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
                  <FormControl.Label>
                    Selecione a subcategoria
                  </FormControl.Label>
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
                  ></Controller>*/}

              <ControlledInput
                control={control}
                name="title"
                label={'Título'}
                error={errors.title}
                isTextArea={false}
                placeholder="Caracteres: máximo de 40 e mínimo de 6"
              ></ControlledInput>

              <ControlledInput
                control={control}
                name="content"
                label={'Conteúdo'}
                error={errors.content}
                isTextArea={true}
                placeholder="Caracteres: máximo de 1800 e mínimo de 140"
              ></ControlledInput>

              {/*<ControlledInput
              control={control}
              name="imageDescription"
              label={'Imagem'}
              error={errors.imageDescription}
              isTextArea={false}
              hasImage={true}
              placeholder="Descrição textual, máximo de 200 caracteres."
                ></ControlledInput> */}

              {/*
            <Controller
              control={control}
              name={'image'}
              rules={{ required: true }}
              render={({ field: { value } }) => (
                <FormControl
                  width="100%"
                  isRequired
                  isInvalid={value ? false : true}
                >
                  <HStack
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent="space-between"
                    marginTop={'4'}
                  >
                    <Text>Formatos aceitos: png e jpg.</Text>
                    <Button
                      width="24"
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
            ></Controller>*/}
            </Box>

            <HStack width="100%" marginTop="5" justifyContent="space-between">
              <Button
                width={'32'}
                colorScheme="blue"
                variant="outline"
                borderColor="blue.500"
                onPress={handleNavigateGoBack}
              >
                Cancelar
              </Button>
              <Button
                width={'32'}
                onPress={handleSubmit(onSubmit)}
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
              >
                Criar
              </Button>
            </HStack>
          </VStack>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
