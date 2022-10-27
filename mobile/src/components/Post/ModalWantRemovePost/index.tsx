import { Button, Modal, Text } from 'native-base';
import { FunctionComponent } from 'react';

export type ModalWantRemovePostProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const ModalWantRemovePost: FunctionComponent<
  ModalWantRemovePostProps
> = ({ isOpen, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>Remover post</Modal.Header>
        <Modal.Body>
          <Text>Você tem certeza que deseja excluir o post?</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group
            width="100%"
            display={'flex'}
            justifyContent={'space-between'}
            flexDirection={'row'}
          >
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              Cancelar
            </Button>
            <Button onPress={handleConfirm} colorScheme="red">
              Sim, excluir
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
