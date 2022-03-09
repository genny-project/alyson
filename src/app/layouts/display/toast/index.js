import { HStack, Text, useToast } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { selectToast } from 'redux/app/selectors'
import { toLower } from 'ramda'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Toast = () => {
  const toast = useToast()
  const newToast = useSelector(selectToast)

  console.log(newToast)

  useEffect(() => {
    if (newToast)
      toast({
        isClosable: true,
        position: 'top-right',
        status: toLower(newToast.code || 'info'),
        render: () => (
          <HStack
            paddingBlock={5}
            paddingInline={6}
            bg={`${toLower(newToast.code || 'info')}.50`}
            borderWidth={'1px'}
            borderColor={`${toLower(newToast.code || 'info')}.500`}
            borderRadius={'lg'}
            color={`${toLower(newToast.code || 'info')}.900`}
          >
            <FontAwesomeIcon
              color={`${toLower(newToast.code || 'info')}.900`}
              icon={faCheckCircle}
              size="lg"
            />
            <Text>{newToast.message}</Text>
          </HStack>
        ),
      })
  }, [newToast, toast])
  return null
}

export default Toast
