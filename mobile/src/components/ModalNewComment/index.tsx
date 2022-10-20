import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Flex,
  HStack,
  Input,
  Modal,
  Pressable,
  SimpleGrid,
  Text,
  TextArea,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEventListener,
} from 'react-native';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { CreateCommentForm } from '@src/contracts/Comment';
import { useAuth } from '@src/hooks/useAuth';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';

export type ModalNewCommentProps = {
  author: string;
  postId: string;
  isOpen: boolean;
  onClose: () => void;
};

const MIN_SIZE = 8;
const MAX_SIZE = 1800;

const schema = yup.object({
  text: yup
    .string()
    .min(MIN_SIZE, `O conteúdo deve conter no mínimo ${MIN_SIZE} caracteres`)
    .max(MAX_SIZE, `O conteúdo deve conter no máximo ${MAX_SIZE} caracteres`)
    .required('Conteúdo é obrigatório.'),
});

// type KeyboardEventListener = (event: KeyboardEvent) => void;

export const ModalNewComment: FunctionComponent<ModalNewCommentProps> = ({
  isOpen,
  onClose,
  author,
  postId,
}) => {
  const toast = useToast();
  const { user } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentForm>({
    resolver: yupResolver(schema),
  });
  const mutationCreateComment = useMutation(
    diversaGenteServices.createComment,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['diversagente@comments', data.postId]);
        toast.show({
          title: 'Deu tudo certo!',
          description: 'Seu comentário foi criado com sucesso!',
          background: 'green.500',
        });
        reset();
        onClose();
      },
    },
  );

  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow: KeyboardEventListener = (event) => {
    setKeyboardOffset(event.endCoordinates.height);
  };

  const onKeyboardHide: KeyboardEventListener = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef<EmitterSubscription>();
  const keyboardDidHideListener = useRef<EmitterSubscription>();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      'keyboardWillShow',
      onKeyboardShow,
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      'keyboardWillHide',
      onKeyboardHide,
    );

    return () => {
      keyboardDidShowListener?.current?.remove();
      keyboardDidHideListener?.current?.remove();
    };
  }, []);

  const onSubmitCommentCreation = async (data: CreateCommentForm) => {
    console.log('submiting forms with ', data);
    const ownerId = String(user?.id);

    await mutationCreateComment.mutateAsync({
      text: data.text,
      ownerId,
      postId,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      justifyContent="flex-end"
      size="full"
      position="absolute"
      bottom={keyboardOffset}
    >
      <Modal.Content>
        <Modal.Header>Deixe seu comentário</Modal.Header>
        <Modal.CloseButton />
        <Modal.Body>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Controller
              control={control}
              name="text"
              render={({ field: { onChange, value } }) => (
                <TextArea
                  borderColor={[errors.text ? 'red.500' : 'blue.800']}
                  size="lg"
                  placeholder={`Responder a ${author}..`}
                  value={value}
                  onChangeText={onChange}
                  flex="1"
                  autoCompleteType="off"
                  height={'100%'}
                  width={'100%'}
                  InputRightElement={
                    <Button
                      size="md"
                      height="100%"
                      borderColor="transparent"
                      variant="outline"
                      onPress={handleSubmit(onSubmitCommentCreation)}
                      colorScheme={
                        typeof value !== 'string' ||
                        value.length === 0 ||
                        value.length < MIN_SIZE
                          ? 'black'
                          : 'green'
                      }
                    >
                      Enviar
                    </Button>
                  }
                />
              )}
            />
          </Flex>
          {errors.text && (
            <HStack marginTop={2} alignItems="center">
              <WarningOutlineIcon size="xs" color="red.600" paddingRight={4} />
              <Text
                alignItems={'center'}
                fontSize={'12'}
                color="red.600"
                marginRight={2}
              >
                {errors.text.message}
              </Text>
            </HStack>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
