import { Feather } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import { Box, Icon, Menu, Pressable, Spinner, useToast } from 'native-base';
import { FunctionComponent, useCallback, useState } from 'react';
import { useMutation } from 'react-query';

import { CommentActionMenuItem } from './CommentActionMenuItem';

import { ConditionallyRender } from '@src/components/ConditionallyRender';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { ModalConfirmAction } from '@src/components/ModalConfirmAction';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';

export type CommentMoreActionsProps = {
  isOwner: boolean;
  commentId: string;
  onActivateCommentEditMode: () => void;
};

export const CommentMoreActions: FunctionComponent<CommentMoreActionsProps> = ({
  isOwner,
  commentId,
  onActivateCommentEditMode,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [
    isConfirmationComplaintModalVisible,
    setIsConfirmationComplaintModalVisible,
  ] = useState(false);
  const linkTo = useLinkTo();
  const toast = useToast();
  const deleteCommentMutation = useMutation(
    diversaGenteServices.deleteCommentById,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diversagente@comments', commentId]);

        toast.show({
          description: 'Comentário excluído com sucesso!',
          bg: 'green.500',
        });
        linkTo('/home');
      },
      onError: () => {
        toast.show({
          description: 'Não foi possível excluir o comentário!',
          background: 'red.500',
        });
        linkTo('/home');
      },
    },
  );

  const handleDontLike = () => {
    toast.show({
      description: 'O diversagente usará isso para aprimorar sua timeline.',
      background: 'muted.400',
    });
  };

  const handleWantRemoveComment = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDeleteComment = useCallback(async () => {
    if (isOwner) {
      await deleteCommentMutation.mutateAsync(commentId);
    }
  }, [deleteCommentMutation, isOwner, commentId]);

  const handleOpenComplaint = () => {
    linkTo(`/complaints/comment/${commentId}`);
  };

  return (
    <Box w="100%" alignItems="center">
      <Menu
        w="200"
        closeOnSelect
        defaultIsOpen={false}
        trigger={(triggerProps) => {
          return (
            <Pressable
              accessibilityLabel="More comment options menu"
              {...triggerProps}
            >
              <LoadingFallback
                isLoading={deleteCommentMutation.isLoading}
                fallback={<Spinner size="lg" color="orange.500" />}
              >
                <Icon as={Feather} name="more-horizontal" size={6} />
              </LoadingFallback>
            </Pressable>
          );
        }}
      >
        <ConditionallyRender
          condition={!isOwner}
          trueComponent={
            <CommentActionMenuItem
              icon="frown"
              label="Não tenho interesse"
              onPress={handleDontLike}
            />
          }
          falseComponent={<></>}
        />

        <ConditionallyRender
          condition={isOwner}
          trueComponent={
            <CommentActionMenuItem
              icon="edit"
              label="Editar conteúdo"
              onPress={onActivateCommentEditMode}
            />
          }
          falseComponent={<></>}
        />

        <ConditionallyRender
          condition={isOwner}
          trueComponent={
            <CommentActionMenuItem
              icon="trash-2"
              label="Excluir post"
              onPress={handleWantRemoveComment}
            />
          }
          falseComponent={<></>}
        />

        <CommentActionMenuItem
          icon="flag"
          label="Denunciar"
          onPress={() => setIsConfirmationComplaintModalVisible(true)}
        />
      </Menu>

      <ModalConfirmAction
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmDeleteComment}
        title="Remover comentário"
        description="Você tem certeza que deseja remover o seu comentário nessa publicação? Essa ação não pode ser desfeita."
        confirmText="Sim, tenho certeza"
        confirmColor="red"
      />

      <ModalConfirmAction
        isOpen={isConfirmationComplaintModalVisible}
        onClose={() => setIsConfirmationComplaintModalVisible(false)}
        onConfirm={handleOpenComplaint}
        title="Abrir denúncia de comentário"
        description="Você tem certeza que deseja abrir uma denúncia para esse comentário?"
        confirmText="Sim, tenho certeza"
        confirmColor="red"
      />
    </Box>
  );
};
