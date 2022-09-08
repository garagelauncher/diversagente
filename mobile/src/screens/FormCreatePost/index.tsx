import { Ionicons } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
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
  Badge,
  Link,
  WarningOutlineIcon,
  Input,
  Icon,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';

import { Categories } from '@src/components/Categories';
import { FormInput } from '@src/components/FormInput';
import { Category } from '@src/contracts/Category';
import { logger } from '@src/utils/logger';

type CreatePostFormData = {
  title: string;
  content: string;
  image?: string;
};

const schema = yup.object({
  title: yup
    .string()
    .min(40, 'Máximo de 40 caracteres.')
    .required('Informe o título da postagem.'),
  content: yup
    .string()
    .min(1800, 'Mínimo de 6 caracteres')
    .required('Informe o conteúdo da postagem.'),
  image: yup.mixed().nullable(),
});

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="position" enabled>
        <ScrollView>
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
                    Lembre-se de ser respeitoso e de que essa comunidade é
                    voltada para ajudar pais, familiares e amigos de crianças
                    neurodiversas.
                  </Text>
                </Box>
              </VStack>
            </Alert>

            <VStack space="6">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Button size="md" variant="outline">
                  Selecionar categoria
                </Button>
                <Text>Saúde</Text>
              </HStack>
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <Button size="md" variant="outline">
                  Selecionar subcategoria
                </Button>
                <Text>Saúde mental</Text>
              </HStack>
            </VStack>

            <FormControl isRequired isInvalid={false}>
              <FormControl.Label>
                <Text fontSize="16" fontWeight="bold" marginBottom="2">
                  Título
                </Text>
              </FormControl.Label>
              <Input size="md" placeholder="Máximo de 40 caracteres." />
              <FormInput value="" />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="s" />}
              >
                O título é obrigatório para conseguir fazer postagens.
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl
              isRequired
              isInvalid={'thought' in errors}
              marginBottom="2"
            >
              <Text fontSize="16" fontWeight="bold" marginBottom="2">
                Imagem
              </Text>
              <HStack justifyContent="space-between" alignItems="center">
                <Text>Formatos aceitos: png e jpg.</Text>
                <Button
                  width="32"
                  leftIcon={
                    <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
                  }
                >
                  Upload
                </Button>
              </HStack>
              <FormControl.Label>
                <Text fontSize="16" fontWeight="bold" marginBottom="2">
                  Conteúdo
                </Text>
              </FormControl.Label>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ScrollView>
                    <TextArea
                      size="md"
                      width="100%"
                      placeholder="Máximo de 1800 caracteres."
                      onChangeText={(val) => onChange(val)}
                      defaultValue={value}
                      autoCompleteType="off"
                    />
                  </ScrollView>
                )}
                name="thought"
                rules={{
                  required: 'O conteúdo da postagem é obrigatório',
                  minLength: 3,
                }}
              />
              <FormControl.ErrorMessage>
                {errors.thought?.message}
              </FormControl.ErrorMessage>
            </FormControl>
            <HStack width="100%" justifyContent="space-between">
              <Button
                width="40"
                onPress={handleSubmit(onSubmit)}
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
              >
                Criar
              </Button>
            </HStack>
          </VStack>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
