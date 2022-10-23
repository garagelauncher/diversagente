import Ionicons from '@expo/vector-icons/Ionicons';
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
  FormControl,
  WarningOutlineIcon,
  CheckIcon,
  Select,
  Collapse,
} from 'native-base';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as yup from 'yup';

import { ControlledInput } from '@src/components/ControlledInput';
import { Category } from '@src/contracts/Category';
import { PostForm } from '@src/contracts/Post';
import { Subcategory } from '@src/contracts/Subcategory';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { FilterSubcategory } from '@src/services/diversaGente/subcategories';
import { queryClient } from '@src/services/queryClient';

type FormCreatePostNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'FormCreatePost'
>;

const schema = yup.object({
  title: yup
    .string()
    .min(6, 'O título deve conter no mínimo 6 caracteres.')
    .max(200, 'O título deve conter no máximo 200 caracteres.')
    .required('Título é obrigatório.'),
  content: yup
    .string()
    .min(50, 'O conteúdo deve conter no mínimo 50 caracteres')
    .max(1800, 'O conteúdo deve conter no máximo 1800 caracteres')
    .required('Conteúdo é obrigatório.'),
  categoryId: yup.string().required(),
  subcategoryId: yup.string().optional(),
  //image: yup.mixed().optional(),
  // imageDescription: yup
  // .string()
  // .optional()
  // .min(80, 'Mínimo de 80 caracteres')
  // .max(200, 'Máximo de 200 caracteres.')
  // .transform((value) => (value ? value : null))
  // .nullable(),
});

export const FormCreatePost = () => {
  const [isClosed, setIsClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorAtPostCreation, setErrorAtPostCreation] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [categoryId, setCategoryId] = useState<string>('');
  const { user } = useAuth();
  //const [selectedImage, setSelectedImage] = useState<any>(null);

  const navigation = useNavigation<FormCreatePostNavigationProps>();

  const fetchAllCategories = async () => {
    try {
      const categoriesFromApi = await diversaGenteServices.findAllCategories();
      setCategories(categoriesFromApi.results);
    } catch (error) {
      console.info('Error while fetching all categories', error);
    }
  };

  const fetchRelatedSubcategoriesToCategory = async () => {
    const filterParams: FilterSubcategory = {
      categoriesIds: {
        hasSome: [categoryId],
      },
    };
    try {
      const relatedSubcategoriesToCategory =
        await diversaGenteServices.findRelatedSubcategoriesToCategory(
          categoryId,
          filterParams,
        );
      setSubcategories(relatedSubcategoriesToCategory);
    } catch (error) {
      console.info(
        'Error while fetching the subcategories related to the selected category',
        error,
      );
    }
  };

  const updateCategoryIdSelected = (categoryId: string) => {
    setSubcategories([]);
    setCategoryId(categoryId);
  };

  /**
  const pickImage = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 1,
    });

    console.log('image data', pickerResult);

    if (!pickerResult.cancelled) {
      setSelectedImage({ localUri: pickerResult.uri });
    }
  }; */

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>({
    resolver: yupResolver(schema),
  });

  const onSubmitPostCreation = (data: PostForm) => {
    console.log('submiting forms with ', data);
    createPost(data);
  };

  const handleOnClose = () => {
    setIsClosed(true);
  };

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  async function createPost(data: PostForm): Promise<PostForm | undefined> {
    setErrorAtPostCreation(false);
    setIsLoading(true);
    try {
      setErrorAtPostCreation(false);
      const createdPost = await diversaGenteServices.createPost({
        ...data,
        ownerId: String(user?.id),
      });
      queryClient.invalidateQueries('diversagente@posts');
      navigation.navigate('Forum');
      return createdPost;
    } catch (error) {
      setErrorAtPostCreation(true);
      setIsLoading(false);
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
              <TouchableOpacity>
                <CloseIcon onPress={handleNavigateGoBack} marginTop="2" />
              </TouchableOpacity>
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

            <Collapse isOpen={!isClosed} marginTop={2}>
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
                    <TouchableOpacity>
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
                    </TouchableOpacity>
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
            </Collapse>

            <Controller
              control={control}
              name="categoryId"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <FormControl
                  w="100%"
                  isRequired
                  isInvalid={errors.categoryId ? true : false}
                >
                  <FormControl.Label>Selecione a categoria</FormControl.Label>
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
                    onValueChange={onChange}
                    onOpen={fetchAllCategories}
                  >
                    {categories.map((category) => {
                      return (
                        <Select.Item
                          key={category.id}
                          label={category.title}
                          value={category.id}
                          onPressIn={() =>
                            updateCategoryIdSelected(category.id)
                          }
                        />
                      );
                    })}
                  </Select>
                  {errors.categoryId && (
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
              name="subcategoryId"
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <FormControl
                  w="100%"
                  isDisabled={categories.length > 0 ? false : true}
                >
                  <FormControl.Label>
                    Selecione a subcategoria
                  </FormControl.Label>
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
                    onValueChange={onChange}
                    onOpen={fetchRelatedSubcategoriesToCategory}
                  >
                    {subcategories.map((subcategories) => {
                      return (
                        <Select.Item
                          key={subcategories.id}
                          label={subcategories.title}
                          value={subcategories.id}
                        />
                      );
                    })}
                  </Select>
                  {subcategories.length < 0 && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      <Text>
                        Não existem subcategorias. Você pode prosseguir apenas
                        com a categoria selecionada
                      </Text>
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
              placeholder="Caracteres: máximo de 40 e mínimo de 6"
            ></ControlledInput>

            <ControlledInput
              control={control}
              name="content"
              label={'Conteúdo'}
              error={errors.content}
              isTextArea={true}
              placeholder="Caracteres: máximo de 1800 e mínimo de 50"
            ></ControlledInput>

            {/*
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
                <FormControl
                  width="100%"
                  isRequired
                  isInvalid={value ? false : true}
                >
                  {selectedImage && (
                    <View
                      width={'100%'}
                      height={'72'}
                      backgroundColor={'red.900'}
                    >
                      <Image
                        source={{ uri: selectedImage.localUri }}
                        alt={'Imagem selecionada'}
                        size={'100%'}
                      />
                    </View>
                  )}
                  <HStack
                    alignContent={'center'}
                    alignItems={'center'}
                    justifyContent="space-between"
                    marginTop={'4'}
                  >
                    <Text>Formatos aceitos: png e jpg.</Text>
                    <Button
                      width={'32'}
                      onPress={pickImage}
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
                      <Text>Erro no upload da imagem!</Text>
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              )}
            ></Controller>
            */}

            {errorAtPostCreation && (
              <Alert w="100%" status="error">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      Erro ao criar postagem. Por favor, tente novamente.
                    </Text>
                  </HStack>
                </HStack>
              </Alert>
            )}

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
                onPress={handleSubmit(onSubmitPostCreation)}
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
