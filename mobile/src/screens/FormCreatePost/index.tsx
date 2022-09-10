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
} from 'native-base';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as yup from 'yup';

import { ControlledInput } from '@src/components/ControlledInput';
import { FormInput } from '@src/components/FormInput';
import { logger } from '@src/utils/logger';

type CreatePostFormData = {
  title: string;
  content: string;
  image?: string;
};

const schema = yup.object({
  title: yup
    .string()
    .max(40, 'O título só pode ter até 40 caracteres.')
    .required('Informe o título.'),
  content: yup
    .string()
    .max(1800, 'Mínimo de 6 caracteres')
    .required('Informe o conteúdo.'),
  image: yup.mixed().nullable(),
  imageDescription: yup.string().max(200, 'Máximo de 200 caracteres.'),
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

            <ControlledInput
              control={control}
              name="title"
              error={errors.title}
              label={'Título'}
              isTextArea={false}
              placeholder="Máximo de 40 caracteres."
            ></ControlledInput>

            <ControlledInput
              control={control}
              name="content"
              error={errors.content}
              isTextArea={true}
              label={'Conteúdo'}
              placeholder="Máximo de 1800 caracteres."
            ></ControlledInput>

            <ControlledInput
              control={control}
              name="image"
              error={errors.image}
              isTextArea={false}
              label={'Imagem'}
              placeholder="Descrição da imagem."
            ></ControlledInput>

            <HStack alignContent={'center'} justifyContent="space-between">
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

            <HStack width="100%" marginTop="8" justifyContent="space-between">
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
