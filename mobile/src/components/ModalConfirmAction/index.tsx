import { Button, Modal, Text } from 'native-base';
import { ColorSchemeType } from 'native-base/lib/typescript/components/types';
import { FunctionComponent } from 'react';

export type ModalConfirmActionProps = {
  isOpen: boolean;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  confirmColor?: ColorSchemeType;
  isLoading?: boolean;
  dontCloseOnConfirm?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ModalConfirmAction: FunctionComponent<ModalConfirmActionProps> = ({
  isOpen,
  title,
  description,
  cancelText,
  confirmText,
  confirmColor = 'blue',
  onClose,
  onConfirm,
  dontCloseOnConfirm = false,
  isLoading = false,
}) => {
  const defaultTitle = 'Confirmar ação';
  const confirmationTitle = title ?? defaultTitle;

  const defaultDescription = 'Essa ação não pode ser desfeita. Tem certeza?';
  const confirmationDescription = description ?? defaultDescription;

  const defaultCancelText = 'Cancelar';
  const confirmationCancelText = cancelText ?? defaultCancelText;

  const defaultConfirmText = 'Confirmar';
  const confirmationConfirmText = confirmText ?? defaultConfirmText;

  const handleConfirm = () => {
    onConfirm();

    if (!dontCloseOnConfirm) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{confirmationTitle}</Modal.Header>
        <Modal.Body>
          <Text>{confirmationDescription}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group
            width="100%"
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection={'row'}
          >
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              {confirmationCancelText}
            </Button>
            <Button
              onPress={handleConfirm}
              colorScheme={confirmColor}
              isLoading={isLoading}
            >
              {confirmationConfirmText}
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
