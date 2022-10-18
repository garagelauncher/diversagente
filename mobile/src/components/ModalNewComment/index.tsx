import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal } from 'native-base';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
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

export const ModalNewComment: FunctionComponent<ModalNewCommentProps> = ({
  isOpen,
  onClose,
  author,
  postId
}) => {
  const { user } = useAuth();
  const mutationCreateComment = useMutation(
    diversaGenteServices.createComment,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('diversagente@comments', data.postId);
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
      avoidKeyboard
      justifyContent="flex-end"
      bottom="4"
      size="lg"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Responder {author}</Modal.Header>
        <Modal.Body>
          Agreguemos valor ao conteúdo de nossos colegas, deixando comentários
          <ControlledInput
            control={control}
            name="text"
            label={'Comentário'}
            error={errors.text}
            isTextArea={true}
            placeholder="Caracteres: máximo de 1800 e mínimo de 8"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button flex="1" onPress={handleSubmit(onSubmitCommentCreation)}>
            Responder
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
