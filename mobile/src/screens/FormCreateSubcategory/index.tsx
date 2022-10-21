import Ionicons from '@expo/vector-icons/Ionicons';
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
import { Subcategory, SubcategoryForm } from '@src/contracts/Subcategory';
import { useCategories } from '@src/hooks/queries/useCategories';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';
import { useCategoryDetails } from '@src/hooks/queries/details/useCategoryDetails';
import { useSubcategoryCreation } from '@src/hooks/queries/creation/useSubcategoryCreation';

type FormCreateSubcategoryNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'FormCreateSubcategory'
>;

const schema = yup.object({
  title: yup
    .string()
    .min(6, 'O nome deve conter no mínimo 6 caracteres.')
    .max(200, 'O nome deve conter no máximo 200 caracteres.')
    .required('Nome é obrigatório.'),
  description: yup
    .string()
    .min(50, 'A descrição deve conter no mínimo 50 caracteres')
    .max(140, 'A descrição deve conter no máximo 140 caracteres')
    .required('Descrição é obrigatória.'),
  categoryId: yup.string().required(),
  subcategoryId: yup.string().optional(),
});

export const FormCreateSubcategory = () => {
  const route =
    useRoute<
      RouteProp<StackForumNavigatorParamList, 'FormCreateSubcategory'>
    >();
  const { subcategoryId, categoryId } = route.params;
  const { user } = useAuth();

  const navigation = useNavigation<FormCreateSubcategoryNavigationProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SubcategoryForm>({
    resolver: yupResolver(schema),
  });

  const onSubmitPostCreation = (data: PostForm) => {
    console.log('submiting forms with ', data);
    createSubcategory(data);
  };

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const { data } = useCategoryDetails(categoryId);

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

            <Box>{data}</Box>
            <Box>{subcategoryId}</Box>

            <ControlledInput
              control={control}
              name="title"
              label={'Nome'}
              error={errors.title}
              isTextArea={false}
              placeholder="Caracteres: máximo de 40 e mínimo de 6"
            ></ControlledInput>

            <ControlledInput
              control={control}
              name="description"
              label={'Descrição'}
              error={errors.description}
              isTextArea={true}
              placeholder="Caracteres: máximo de 140 e mínimo de 50"
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
                onPress={handleSubmit(onSubmitPostCreation)}
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
