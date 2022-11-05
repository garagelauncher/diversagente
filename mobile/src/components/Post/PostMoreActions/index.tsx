import { Feather } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import {
  Box,
  Icon,
  Menu,
  Pressable,
  Spinner,
  useClipboard,
  useToast,
} from 'native-base';
import { FunctionComponent, useCallback, useState } from 'react';
import { useMutation } from 'react-query';

import { ModalWantRemovePost } from '../ModalWantRemovePost';
import { PostActionMenuItem } from './PostActionMenuItem';

import { ConditionallyRender } from '@src/components/ConditionallyRender';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { ModalConfirmAction } from '@src/components/ModalConfirmAction';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';

export type PostMoreActionsProps = {
  isOwner: boolean;
  postId: string;
  onActivatePostEditMode: () => void;
  onDeletedPost?: () => void;
};

export const PostMoreActions: FunctionComponent<PostMoreActionsProps> = ({
  isOwner,
  postId,
  onActivatePostEditMode,
  onDeletedPost,
}) => {
  const clipboard = useClipboard();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [
    isConfirmationComplaintModalVisible,
    setIsConfirmationComplaintModalVisible,
  ] = useState(false);
  const linkTo = useLinkTo();
  const toast = useToast();
  const deletePostMutation = useMutation(diversaGenteServices.deletePostById, {
    onSuccess: () => {
      queryClient.invalidateQueries(['diversagente@posts']);
      queryClient.invalidateQueries(['diversagente@post', postId]);
      queryClient.invalidateQueries(['diversagente@likes', postId]);
      queryClient.invalidateQueries(['diversagente@comments', postId]);

      toast.show({
        description: 'Post excluído com sucesso!',
        bg: 'green.500',
      });

      if (onDeletedPost) {
        onDeletedPost();
      }
    },
    onError: () => {
      toast.show({
        description: 'Não foi possível excluir o post!',
        background: 'red.500',
      });
      linkTo('/home');
    },
  });

  const handleDontLike = () => {
    toast.show({
      description: 'Agradecemos o feedback.',
      background: 'muted.400',
    });
  };

  const handleWantRemovePost = () => {
    setIsModalVisible(true);
  };

  const handleActivateEditMode = () => {
    onActivatePostEditMode();
    toast.show({
      description: 'Modo de edição',
      background: 'blue.400',
    });
  };

  const handleCopyToClipboard = useCallback(async () => {
    await clipboard.onCopy(`https://diversagente.com.br/post/${postId}`);
    toast.show({
      description: 'Link copiado com sucesso!',
      bg: 'green.500',
    });
  }, [clipboard, postId, toast]);

  const handleConfirmDeletePost = useCallback(async () => {
    if (isOwner) {
      await deletePostMutation.mutateAsync(postId);
    }
  }, [deletePostMutation, isOwner, postId]);

  const handleOpenComplaint = () => {
    linkTo(`/complaints/post/${postId}`);
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
              accessibilityLabel="More post options menu"
              {...triggerProps}
            >
              <LoadingFallback
                isLoading={deletePostMutation.isLoading}
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
            <PostActionMenuItem
              icon="frown"
              label="Não tenho interesse"
              onPress={handleDontLike}
            />
          }
          falseComponent={<></>}
        />

        <PostActionMenuItem
          label="Copiar link"
          icon="link"
          onPress={handleCopyToClipboard}
        />

        <ConditionallyRender
          condition={isOwner}
          trueComponent={
            <PostActionMenuItem
              icon="edit"
              label="Editar conteúdo"
              onPress={handleActivateEditMode}
            />
          }
          falseComponent={<></>}
        />

        <ConditionallyRender
          condition={isOwner}
          trueComponent={
            <PostActionMenuItem
              icon="trash-2"
              label="Excluir post"
              onPress={handleWantRemovePost}
            />
          }
          falseComponent={<></>}
        />

        <PostActionMenuItem
          icon="flag"
          label="Denunciar"
          onPress={() => setIsConfirmationComplaintModalVisible(true)}
        />
      </Menu>

      <ModalWantRemovePost
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmDeletePost}
      />
      <ModalConfirmAction
        isOpen={isConfirmationComplaintModalVisible}
        onClose={() => setIsConfirmationComplaintModalVisible(false)}
        onConfirm={handleOpenComplaint}
        title="Abrir denúncia"
        description="Você tem certeza que deseja abrir uma denúncia para esta publicação?"
        confirmText="Sim, tenho certeza"
        confirmColor="red"
      />
    </Box>
  );
};
