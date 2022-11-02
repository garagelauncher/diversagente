import { Feather } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
import { Box, Icon, Menu, Pressable, Spinner, useToast } from 'native-base';
import { FunctionComponent, useCallback, useState } from 'react';
import { useMutation } from 'react-query';

import { ReviewActionMenuItem } from './ReviewActionMenuItem';

import { ConditionallyRender } from '@src/components/ConditionallyRender';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { ModalConfirmAction } from '@src/components/ModalConfirmAction';
import { diversaGenteServices } from '@src/services/diversaGente';
import { queryClient } from '@src/services/queryClient';

export type ReviewMoreActionsProps = {
  isOwner: boolean;
  reviewId: string;
  locationId: string;
  onActivateReviewEditMode: () => void;
};

export const ReviewMoreActions: FunctionComponent<ReviewMoreActionsProps> = ({
  isOwner,
  reviewId,
  locationId,
  onActivateReviewEditMode,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [
    isConfirmationComplaintModalVisible,
    setIsConfirmationComplaintModalVisible,
  ] = useState(false);
  const linkTo = useLinkTo();
  const toast = useToast();
  const deleteReviewMutation = useMutation(
    diversaGenteServices.deleteReviewById,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['diversagente@reviews', reviewId]);

        toast.show({
          description: 'Review excluído com sucesso!',
          bg: 'green.500',
        });
        linkTo('/home');
      },
      onError: () => {
        toast.show({
          description: 'Não foi possível excluir o review!',
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

  const handleWantRemoveReview = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDeleteReview = useCallback(async () => {
    if (isOwner) {
      await deleteReviewMutation.mutateAsync({
        locationId,
        reviewId
      });
    }
  }, [deleteReviewMutation, isOwner, reviewId]);

  const handleOpenComplaint = () => {
    linkTo(`/complaints/review/${reviewId}`);
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
              accessibilityLabel="More review options menu"
              {...triggerProps}
            >
              <LoadingFallback
                isLoading={deleteReviewMutation.isLoading}
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
            <ReviewActionMenuItem
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
            <ReviewActionMenuItem
              icon="edit"
              label="Editar conteúdo"
              onPress={onActivateReviewEditMode}
            />
          }
          falseComponent={<></>}
        />

        <ConditionallyRender
          condition={isOwner}
          trueComponent={
            <ReviewActionMenuItem
              icon="trash-2"
              label="Excluir post"
              onPress={handleWantRemoveReview}
            />
          }
          falseComponent={<></>}
        />

        <ReviewActionMenuItem
          icon="flag"
          label="Denunciar"
          onPress={() => setIsConfirmationComplaintModalVisible(true)}
        />
      </Menu>

      <ModalConfirmAction
        isOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleConfirmDeleteReview}
        title="Remover review"
        description="Você tem certeza que deseja remover o seu review nessa localização? Essa ação não pode ser desfeita."
        confirmText="Sim, tenho certeza"
        confirmColor="red"
      />

      <ModalConfirmAction
        isOpen={isConfirmationComplaintModalVisible}
        onClose={() => setIsConfirmationComplaintModalVisible(false)}
        onConfirm={handleOpenComplaint}
        title="Abrir denúncia de review"
        description="Você tem certeza que deseja abrir uma denúncia para esse review?"
        confirmText="Sim, tenho certeza"
        confirmColor="red"
      />
    </Box>
  );
};
