import { yupResolver } from '@hookform/resolvers/yup';
import { Button, useToast, Input, Flex, VStack, TextArea } from 'native-base';
import { FunctionComponent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { ModalConfirmAction } from '@src/components/ModalConfirmAction';
import { Post } from '@src/contracts/Post';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';

export type PostEditProps = {
  postId: string;
  isEditModeActive: boolean;
  onDeactiveEditMode: () => void;
  previousTitle: string;
  previousContent: string;
};

const schemaUpdatePost = yup.object({
  title: yup
    .string()
    .min(6, 'O título deve conter no mínimo 6 caracteres.')
    .max(200, 'O título deve conter no máximo 200 caracteres.')
    .required('Título é obrigatório.'),
  content: yup
    .string()
    .min(50, 'O conteúdo deve conter no mínimo 50 caracteres')
    .max(1800, 'O conteúdo deve conter no máximo 1800 caracteres')
    .required('Conteúdo é obrigatório.'),
});

export const PostEdit: FunctionComponent<PostEditProps> = ({
  postId,
  onDeactiveEditMode,
  previousTitle,
  previousContent,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<Post>>({
    resolver: yupResolver(schemaUpdatePost),
    defaultValues: {
      title: previousTitle,
      content: previousContent,
    },
  });

  const toast = useToast();
  const updatePostMutation = useMutation(diversaGenteServices.updatePostById, {
    onSuccess: () => {
      queryClient.invalidateQueries(['diversagente@post', postId]);
      queryClient.invalidateQueries(['diversagente@posts']);

      toast.show({
        description: 'Post atualizado com sucesso!',
        bg: 'green.500',
      });
      onDeactiveEditMode();
    },
    onError: () => {
      toast.show({
        description: 'Não foi possível atualizar o post!',
        background: 'red.500',
      });
      onDeactiveEditMode();
    },
  });
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] =
    useState(false);

  const handleUpdatePost = async (data: Partial<Post>) => {
    await updatePostMutation.mutateAsync({ id: postId, ...data });
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
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            variant="underlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            borderColor={[errors.title ? 'red.500' : 'blue.800']}
            placeholder={'Título'}
            fontSize="18"
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextArea
            variant="underlined"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            h={280}
            borderColor={[errors.content ? 'red.500' : 'blue.800']}
            size="md"
            placeholder={'Conteúdo'}
            autoCompleteType="off"
            fontSize="18"
          />
        )}
        name="content"
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
          isLoading={updatePostMutation.isLoading}
        >
          Atualizar
        </Button>
      </Flex>
      <ModalConfirmAction
        isOpen={isConfirmationModalVisible}
        onConfirm={handleSubmit(handleUpdatePost)}
        onClose={handleCloseConfirmationModal}
        title="Atualizar post"
        description="Tem certeza que deseja atualizar o post? Essas ações não poderão ser desfeitas"
        confirmText="Sim, atualizar"
      />
    </VStack>
  );
};
