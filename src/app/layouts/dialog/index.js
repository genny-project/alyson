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
    <Modal isOpen={dialog !== 'NONE'} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>{dialog === 'FORM' && <Form onFinish={onClose} />}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Dialog
