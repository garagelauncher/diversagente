import { yupResolver } from '@hookform/resolvers/yup';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  VStack,
  Button,
  Heading,
  HStack,
  Box,
  CloseIcon,
  Text,
  Divider,
  Flex,
  useToast,
} from 'native-base';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { ControlledInput } from '@src/components/ControlledInput';
import { SubcategoryForm } from '@src/contracts/Subcategory';
import { useCategoryDetails } from '@src/hooks/queries/details/useCategoryDetails';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';

type FormCreateSubcategoryNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'FormCreateSubcategory',
  'Subcategory'
>;

export const FormCreateSubcategory = () => {
  const route =
    useRoute<
      RouteProp<StackForumNavigatorParamList, 'FormCreateSubcategory'>
    >();
  const { subcategoryId, categoryId } = route.params;

  const navigation = useNavigation<FormCreateSubcategoryNavigationProps>();

  const schema = yup.object({
    title: yup
      .string()
      .min(6, 'O nome deve conter no mínimo 6 caracteres.')
      .max(200, 'O nome deve conter no máximo 200 caracteres.')
      .required('Nome é obrigatório.'),
    description: yup
      .string()
      .min(50, 'A descrição deve conter no mínimo 50 caracteres')
      .max(240, 'A descrição deve conter no máximo 140 caracteres')
      .required('Descrição é obrigatória.'),
  });

  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<SubcategoryForm>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const onSubmitSubcategoryCreation = async (data: SubcategoryForm) => {
    data.name = data.title.toLowerCase();
    data.categoriesIds = [categoryId as string];
    console.log('submiting forms with ', data);
    await mutationCreateSubcategory.mutateAsync({
      ...data,
    });
  };

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const categoryData = useCategoryDetails(categoryId);

  const mutationCreateSubcategory = useMutation(
    diversaGenteServices.createSubcategory,
    {
      onSuccess: async (data) => {
        const subcategory = await diversaGenteServices.findSubcategoryById(
          data.id,
        );

        queryClient.invalidateQueries(['diversagente@subcategories']);
        queryClient.setQueryData(
          ['diversagente@subcategories', subcategory.id],
          subcategory,
        );

        toast.show({
          title: 'Deu tudo certo!',
          description: 'A nova subcategoria foi criada com sucesso!',
          background: 'green.500',
        });
        reset();

        navigation.navigate('Subcategory', {
          categoryTitle: categoryData.data?.title,
          categoryId: categoryData.data?.id,
          subcategoryId: data.id,
        });
      },
      onError: () => {
        toast.show({
          description: 'Ops, algo deu errado na criação dessa subcategoria!',
          background: 'red.500',
        });
        reset();
      },
    },
  );

  return (
    <KeyboardAvoidingView behavior={'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <VStack space={4} marginTop="16" padding="8">
            <HStack alignContent={'center'} justifyContent="space-between">
              <Heading>Nova subcategoria</Heading>
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

            <Flex
              flexDir={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Flex
                bgColor={'blue.600'}
                flex={1}
                p={2}
                borderRadius={16}
                maxW={'32'}
                alignItems={'center'}
              >
                <Text
                  fontSize={18}
                  color={'white'}
                  letterSpacing={0.6}
                  fontWeight={'bold'}
                >
                  Categoria
                </Text>
              </Flex>
              <Text fontSize={24} fontWeight={'bold'} letterSpacing={0.6}>
                {categoryData.data?.title}
              </Text>
            </Flex>

            <Box>{subcategoryId}</Box>

            <ControlledInput
              control={control}
              label={'Nome'}
              error={errors.title}
              isTextArea={false}
              placeholder="Caracteres: máximo de 40 e mínimo de 6"
              {...register('title')}
            ></ControlledInput>

            <ControlledInput
              control={control}
              label={'Descrição'}
              error={errors.description}
              isTextArea={true}
              placeholder="Caracteres: máximo de 240 e mínimo de 50"
              {...register('description')}
            ></ControlledInput>

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
                onPress={handleSubmit(onSubmitSubcategoryCreation)}
                colorScheme="blue"
                type="submit"
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
