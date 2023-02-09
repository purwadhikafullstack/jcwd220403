import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useTrips from '../../hooks/useTrips';

export default function ConfirmCancel({ trip }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axiosPrivate = useAxiosPrivate();
  const { setUpdate } = useTrips();

  function reset() {
    // setSeed(Math.random());
    onClose();
    setUpdate({ update: 'cancel' });
  }

  const cancelTrip = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.patch('/transaction/cancel', { id: trip });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme={'gray'} size={'xs'}>
        Cancel
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
        // key={seed}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to cancel this trip?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button colorScheme='gray' mr={3} onClick={cancelTrip}>
              Yes, cancel it
            </Button>
            <Button colorScheme='teal' onClick={onClose}>
              No, I still want to go there 😢
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
