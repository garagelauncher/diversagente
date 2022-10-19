import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, SimpleGrid } from 'native-base';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEventListener,
} from 'react-native';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { ControlledInput } from '../ControlledInput';

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
  const { user } = useAuth();
  const mutationCreateComment = useMutation(
    diversaGenteServices.createComment,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['diversagente@comments', data.postId]);
      },
    },
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCommentForm>({
    resolver: yupResolver(schema),
  });
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
        <Modal.Header>Responder a {author}</Modal.Header>
        <Modal.CloseButton />
        <Modal.Body>
          <SimpleGrid columns={1} space={2}>
            <ControlledInput
              control={control}
              name="text"
              label={'Comentário'}
              error={errors.text}
              isTextArea={true}
              placeholder="Caracteres: máximo de 1800 e mínimo de 8"
              onBlur={onClose}
            />
            <Button flex="1" onPress={handleSubmit(onSubmitCommentCreation)}>
              Responder
            </Button>
          </SimpleGrid>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};
