import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
3;
import {
  ScrollView,
  VStack,
  Button,
  Text,
  FormControl,
  Input,
  Avatar,
  Icon,
  Box,
  Flex,
  IconButton,
  Heading,
  Accordion,
  Collapse,
  CloseIcon,
  HStack,
  Alert,
  List,
  Checkbox,
  Switch,
  Select,
} from 'native-base';
import React, { useState, memo } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import * as yup from 'yup';

import { ControlledInput } from '@src/components/ControlledInput';
import { UserEditForm } from '@src/contracts/User';
import { useCategories } from '@src/hooks/queries/useCategories';
import { useAuth } from '@src/hooks/useAuth';
import { StackProfileNavigatorParamList } from '@src/routes/stacks/profileStack.routes';
import { theme } from '@src/styles/theme';

type ProfileScreenNavigationProps = NavigationProp<
  StackProfileNavigatorParamList,
  'Profile'
>;

export const EditProfile = () => {
  const { signOut, user, setUser } = useAuth();
  const { data, isLoading } = useCategories();
  const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [isPreferencesAtAppOpen, setPreferencesAtAppOpen] = useState(false);
  const [isSecurityAndPrivacyOpen, setSecurityAndPrivacyOpen] = useState(false);

  const [isPortugueseSelected, setPortugueseSelected] = useState(false);
  const [isEnglishSelected, setEnglishSeselected] = useState(false);

  const schema = yup.object({
    name: yup
      .string()
      .min(6, 'O nome deve conter no mínimo 6 caracteres.')
      .max(32, 'O nome deve conter no máximo 32 caracteres.')
      .required('Nome é obrigatório.'),
    biograph: yup
      .string()
      .min(25, 'A descrição deve conter no mínimo 25 caracteres')
      .max(100, 'A descrição deve conter no máximo 100 caracteres')
      .required('Descrição é obrigatória.'),
    lovelyCategoriesIds: yup
      .array()
      .min(1, 'Selecione pelo menos uma categoria de interesse.')
      .required('Por favor, selecione ao menos uma categoria.'),
    language: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserEditForm>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<ProfileScreenNavigationProps>();

  const handlePerfonalInfoClose = () => {
    setPersonalInfoOpen(!isPersonalInfoOpen);
  };

  const handlePreferencesAtAppClose = () => {
    setPreferencesAtAppOpen(!isPreferencesAtAppOpen);
  };

  const handleSecurityAndPrivacyClose = () => {
    setSecurityAndPrivacyOpen(!isSecurityAndPrivacyOpen);
  };

  const handleLanguageChange = () => {
    setPortugueseSelected(!isPortugueseSelected);
    setEnglishSeselected(!isEnglishSelected);
  };

  const handlePortugueseSelection = () => {
    console.log('Portuguese selected', isPortugueseSelected);
    setPortugueseSelected(!isPortugueseSelected);
    setEnglishSeselected(false);
  };

  const handleEnglishSelection = () => {
    console.log('english', isEnglishSelected);
    setEnglishSeselected(!isEnglishSelected);
    setPortugueseSelected(false);
  };

  const handleNavigateBackToProfile = () => {
    navigation.navigate('Profile', { userId: user?.id as string });
  };

  type CategoriesCheckboxType = {
    title: string;
    categoryId: string;
  };

  type LanguageCheckboxType = {
    title: string;
    languageId: string;
  };

  return (
    <ScrollView>
      <Flex px={8} py={12} alignItems={'center'}>
        <Heading fontSize={20} fontWeight={'semibold'}>
          Edição do perfil
        </Heading>

        <Box position="absolute" pr={'96%'} pt={6}>
          <IconButton
            _pressed={{ opacity: '0.6' }}
            onPress={handleNavigateBackToProfile}
            variant="solid"
            marginTop={18}
            bgColor={'transparent'}
            icon={
              <Icon
                size={'2xl'}
                color={'black'}
                marginBottom={2}
                as={<Feather name="arrow-left" size={32} />}
              />
            }
          />
        </Box>

        <Flex w={'100%'}>
          <Flex alignItems={'center'} mt={8}>
            <Avatar
              bg="amber.500"
              source={{
                uri: user?.picture ?? '',
              }}
              size="2xl"
            >
              NB
            </Avatar>
            <Box mt={-8} ml={32} bgColor={'blue.600'} p={2} borderRadius={20}>
              <TouchableOpacity>
                <Feather name="edit" size={16} color="white" />
              </TouchableOpacity>
            </Box>
          </Flex>

          <Box mt={6}>
            <TouchableOpacity onPress={handlePerfonalInfoClose}>
              <Flex flexDir="row" mt={5}>
                <Text fontSize={20} fontWeight={'semibold'}>
                  Informações pessoais
                </Text>
                <MaterialIcons
                  style={{
                    transform: [
                      { rotateX: isPersonalInfoOpen ? '180deg' : '0deg' },
                    ],
                  }}
                  name="expand-more"
                  size={24}
                  color="black"
                />
              </Flex>
            </TouchableOpacity>

            <Collapse isOpen={isPersonalInfoOpen} mt={2} w={'100%'}>
              <Box mb={6}>
                <ControlledInput
                  inputVariant="underlined"
                  control={control}
                  name={'name'}
                  defaultValue={user?.name}
                  label={'Nome'}
                  isTextArea={false}
                ></ControlledInput>
              </Box>

              <Box mb={6}>
                <ControlledInput
                  control={control}
                  name={'biograph'}
                  label={'Biografia'}
                  defaultValue={user?.bio ?? '🙂'}
                  isTextArea={true}
                  placeholder="Caracteres: máximo de 100 e mínimo de 25"
                ></ControlledInput>
              </Box>
            </Collapse>
          </Box>

          <Box>
            <TouchableOpacity onPress={handlePreferencesAtAppClose}>
              <Flex flexDir="row" mt={5}>
                <Text fontSize={20} fontWeight={'semibold'}>
                  Preferências no app
                </Text>
                <MaterialIcons
                  style={{
                    transform: [
                      { rotateX: isPreferencesAtAppOpen ? '180deg' : '0deg' },
                    ],
                  }}
                  name="expand-more"
                  size={24}
                  color="black"
                />
              </Flex>
            </TouchableOpacity>

            <Collapse isOpen={isPreferencesAtAppOpen} mt={2} w={'100%'}>
              <Box mb={6}>
                <Flex>
                  <FormControl.Label mt={2} isRequired>
                    <Text
                      mb={2}
                      fontSize="16"
                      fontWeight="bold"
                      color={'gray.500'}
                    >
                      Idioma
                    </Text>
                  </FormControl.Label>
                  <Select defaultValue="pt-BR">
                    <Select.Item label="Português" value="pt-BR" />
                    <Select.Item label="Inglês" value="en-US" />
                  </Select>
                </Flex>
              </Box>
            </Collapse>
          </Box>

          <Box>
            <TouchableOpacity onPress={handleSecurityAndPrivacyClose}>
              <Flex flexDir="row" mt={5}>
                <Text fontSize={20} fontWeight={'semibold'}>
                  Segurança e Privacidade
                </Text>
                <MaterialIcons
                  style={{
                    transform: [
                      {
                        rotateX: isSecurityAndPrivacyOpen ? '180deg' : '0deg',
                      },
                    ],
                  }}
                  name="expand-more"
                  size={24}
                  color="black"
                />
              </Flex>
            </TouchableOpacity>

            <Collapse isOpen={isSecurityAndPrivacyOpen} mt={2} w={'100%'}>
              <TouchableOpacity activeOpacity={0.6}>
                <Button mt={2} mb={4} bgColor={'red.500'}>
                  <Text fontSize={16} color={'white'} fontWeight={'bold'}>
                    Deletar conta
                  </Text>
                </Button>
              </TouchableOpacity>
            </Collapse>
          </Box>
        </Flex>
      </Flex>
    </ScrollView>
  );
};
