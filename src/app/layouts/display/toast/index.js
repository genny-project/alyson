import { useToast } from '@chakra-ui/react'
import { toLower } from 'ramda'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectToast } from 'redux/app/selectors'

const Toast = () => {
  const toast = useToast()
  const newToast = useSelector(selectToast)

  useEffect(() => {
    if (newToast)
      toast({
        isClosable: true,
        position: 'top-right',
        description: newToast.message,
        status: toLower(newToast.code || 'info'),
      })
  }, [newToast, toast])
  return null
}

export default Toast
