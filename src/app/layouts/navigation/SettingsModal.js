import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { apiConfig } from 'config/get-api-config'

const SettingsModal = ({ isOpen, onClose }) => {
  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <iframe
            style={{ height: '85vh', width: '100%', border: 'none', borderRadius: '8px' }}
            src={`https://keycloak.gada.io/auth/realms/${apiConfig?.realm}/account/`}
            title={'My Account'}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SettingsModal
