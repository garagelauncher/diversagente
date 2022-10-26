import { yupResolver } from '@hookform/resolvers/yup';
import { Button, useToast, Flex, VStack, TextArea } from 'native-base';
import { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { ModalConfirmAction } from '@src/components/ModalConfirmAction';
import { UpdateCommentForm } from '@src/contracts/Comment';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';

export type CommentEditProps = {
  commentId: string;
  postId: string;
  isEditModeActive: boolean;
  onDeactiveEditMode: () => void;
  previousText: string;
};

const MIN_SIZE = 8;
const MAX_SIZE = 1800;

const schemaUpdateComment = yup.object({
  text: yup
    .string()
    .min(MIN_SIZE, `O conteúdo deve conter no mínimo ${MIN_SIZE} caracteres`)
    .max(MAX_SIZE, `O conteúdo deve conter no máximo ${MAX_SIZE} caracteres`)
    .required('Conteúdo é obrigatório.'),
});

export const CommentEdit: FunctionComponent<CommentEditProps> = ({
  commentId,
  onDeactiveEditMode,
  previousText,
  postId,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateCommentForm>({
    resolver: yupResolver(schemaUpdateComment),
    defaultValues: {
      text: previousText,
    },
  });

  const toast = useToast();
  const updateCommentMutation = useMutation(
    diversaGenteServices.updateCommentById,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diversagente@comments', commentId]);
        queryClient.invalidateQueries(['diversagente@comments']);

        toast.show({
          description: 'Comentário atualizado com sucesso!',
          bg: 'green.500',
        });
        onDeactiveEditMode();
      },
      onError: () => {
        toast.show({
          description: 'Não foi possível atualizar o Comentário!',
          background: 'red.500',
        });
        onDeactiveEditMode();
      },
    },
  );
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const handleUpdateComment = async (data: UpdateCommentForm) => {
    await updateCommentMutation.mutateAsync({ commentId, postId, ...data });
  };

  const handleCancelPostEdit = () => {
    onDeactiveEditMode();
    reset();
  };

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalVisible(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalVisible(false);
  };

  return (
    <VStack space={4}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextArea
            variant="underlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            h={75}
            borderColor={[errors.text ? 'red.500' : 'blue.800']}
            size="md"
            placeholder={'Conteúdo'}
            autoCompleteType="off"
            fontSize="18"
          />
        )}
        name="text"
      />
      <Flex
        width="100%"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button colorScheme="blueGray" onPress={handleCancelPostEdit}>
          Cancelar
        </Button>
        <Button
          onPress={handleOpenConfirmationModal}
          colorScheme="blue"
          isLoading={updateCommentMutation.isLoading}
        >
          Atualizar
        </Button>
      </Flex>
      <ModalConfirmAction
        isOpen={isConfirmationModalVisible}
        onConfirm={handleSubmit(handleUpdateComment)}
        onClose={handleCloseConfirmationModal}
        title="Atualizar comentário"
        description="Tem certeza que deseja atualizar o comentário? Essa ação não poderá ser desfeita"
        confirmText="Sim, atualizar"
      />
    </VStack>
  );
};
