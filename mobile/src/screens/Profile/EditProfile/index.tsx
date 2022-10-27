import { Feather, MaterialIcons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
3;
import {
  ScrollView,
  Button,
  Text,
  FormControl,
  Avatar,
  Icon,
  Box,
  Flex,
  IconButton,
  Heading,
  Collapse,
  Select,
  useToast,
} from 'native-base';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { ControlledInput } from '@src/components/ControlledInput';
import { User, UserEditProps } from '@src/contracts/User';
import { useAuth } from '@src/hooks/useAuth';
import { StackProfileNavigatorParamList } from '@src/routes/stacks/profileStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';

type ProfileScreenNavigationProps = NavigationProp<
  StackProfileNavigatorParamList,
  'Profile'
>;

export const EditProfile = () => {
  const { signOut, user, setUser } = useAuth();
  const [isPersonalInfoOpen, setPersonalInfoOpen] = useState(true);
  const [isPreferencesAtAppOpen, setPreferencesAtAppOpen] = useState(false);
  const [isSecurityAndPrivacyOpen, setSecurityAndPrivacyOpen] = useState(false);

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
      .of(yup.string())
      .min(1, 'Selecione pelo menos uma categoria de interesse.')
      .required('Por favor, selecione ao menos uma categoria.'),
    language: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserEditProps>({
    resolver: yupResolver(schema),
  });

  const toast = useToast();
  const updateUserDataMutation = useMutation(
    diversaGenteServices.updateUserData,
    {
      onSuccess: () => {
        toast.show({
          description: 'Post atualizado com sucesso!',
          bg: 'green.500',
        });
      },
      onError: () => {
        toast.show({
          description: 'Não foi possível atualizar o post!',
          background: 'red.500',
        });
      },
    },
  );

  const handleUpdateUserPersonalInfo = async (data: Partial<UserEditProps>) => {
    console.log('handleUpdateUserPerfonalInfo');
    await updateUserDataMutation.mutateAsync({
      username: user?.username,
      ...data,
    });
  };

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

  const handleNavigateBackToProfile = () => {
    navigation.navigate('Profile', { userId: user?.id as string });
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
                  error={errors.name}
                  defaultValue={user?.name}
                  label={'Nome'}
                  isTextArea={false}
                ></ControlledInput>
              </Box>

              <Box mb={6}>
                <ControlledInput
                  control={control}
                  error={errors.biograph}
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
