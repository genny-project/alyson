import { useToast } from '@chakra-ui/react'
import ErrorToast from 'app/layouts/display/toast/error/'
import InfoToast from 'app/layouts/display/toast/information/'
import SuccessToast from 'app/layouts/display/toast/success/'
import { useSelector } from 'react-redux'
import { selectToast } from 'redux/app/selectors'

const Toast = () => {
  const toast = useToast()
  const newToast = useSelector(selectToast)
  const status = newToast?.code
  const description = newToast?.message

  const handleClose = () => toast.closeAll()

  return (
    <>
      <ErrorToast onClick={handleClose} status={status} description={description} />
      <SuccessToast onClick={handleClose} status={status} description={description} />
      <InfoToast onClick={handleClose} status={status} description={description} />
    </>
  )
}

export default Toast
