import { useToast } from '@chakra-ui/react'
import ErrorToast from 'app/layouts/display/toast/error/'
import InfoToast from 'app/layouts/display/toast/information/'
import SuccessToast from 'app/layouts/display/toast/success/'

const Toast = () => {
  const toast = useToast()
  const handleClose = () => toast.closeAll()

  return (
    <>
      <ErrorToast onClick={handleClose} />
      <SuccessToast onClick={handleClose} />
      <InfoToast onClick={handleClose} />
    </>
  )
}

export default Toast
