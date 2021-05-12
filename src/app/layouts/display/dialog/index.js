import { useSelector, useDispatch } from 'react-redux'
import { selectDialog } from 'redux/app/selectors'
import { closeDialog } from 'redux/app'
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react'

import Form from 'app/layouts/form'

const Dialog = () => {
  const dispatch = useDispatch()
  const dialog = useSelector(selectDialog)
  const onClose = () => dispatch(closeDialog())

  return (
    <Modal size="xl" isOpen={dialog !== 'NONE'} onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>{dialog === 'FORM' && <Form dialog onFinish={onClose} />}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Dialog
