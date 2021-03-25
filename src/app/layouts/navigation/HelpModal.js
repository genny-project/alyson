import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import Email from 'app/DTT/email'

const HelpModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help and Support</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Text>{`We will soon be providing chat support! For now please email us at`}</Text>
            <Email.Read data={{ value: 'internmatch@outcomelife.com.au' }} />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default HelpModal
