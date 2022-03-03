import { HStack, Text, useToast } from '@chakra-ui/react'

import { selectToast } from 'redux/app/selectors'
import { toLower } from 'ramda'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Toast = () => {
  const toast = useToast()
  const newToast = useSelector(selectToast)

  useEffect(() => {
    if (newToast)
      toast({
        isClosable: true,
        position: 'top-right',
        status: toLower(newToast.code || 'info'),
        render: (
          <HStack paddingBlock={5} paddingInline={6} borderRadius={'lg'}>
            <Text>{newToast.message}</Text>
          </HStack>
        ),
      })
  }, [newToast, toast])
  return null
}

export default Toast
