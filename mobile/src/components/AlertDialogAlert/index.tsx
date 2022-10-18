// eslint-disable-next-line import/no-unresolved
import { AlertDialog, Flex, Button, Stack } from 'native-base';
// eslint-disable-next-line import/default
import React from 'react';

import { theme } from '@src/styles/theme';

type AlertDialogAlertProps = {
  dialogHeader: string;
  dialogBody: string;
};

export const AlertDialogAlert = ({
  dialogHeader,
  dialogBody,
}: AlertDialogAlertProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{dialogHeader}</AlertDialog.Header>
        <AlertDialog.Body>{dialogBody}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="unstyled"
              colorScheme="coolGray"
              onPress={onClose}
              ref={cancelRef}
            >
              Cancel
            </Button>
            <Button colorScheme="danger" onPress={onClose}>
              Delete
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};
