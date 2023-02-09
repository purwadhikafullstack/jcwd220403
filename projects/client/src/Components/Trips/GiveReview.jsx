import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useTrips from '../../hooks/useTrips';

export default function GiveReview({ property, id, passCheckOut }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axiosPrivate = useAxiosPrivate();
  const [reviewText, setReviewText] = useState('');
  const [disable, setDisable] = useState(passCheckOut);
  const { setUpdate } = useTrips();
  const handleInput = (e) => {
    setReviewText(e.target.value);
  };

  function reset() {
    onClose();
    setUpdate({ update: 'review' });
  }

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.post('/review', { transactionId: id, reviewText });
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme={'teal'}
        size={'xs'}
        isDisabled={disable}
      >
        Give Review
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your Review for {property}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input type={'text'} h={'150'} onChange={handleInput}></Input>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={submitReview}>
              Submit
            </Button>
            <Button colorScheme='orange' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
