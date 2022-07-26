import { HStack, Text, useClipboard, useToast } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Write } from 'app/DTT/text'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const Read = ({ data }) => {
  const { onCopy } = useClipboard(data.value)
  const toast = useToast()

  if (!data?.value) return null

  const onClick = () => {
    onCopy()
    toast({
      status: 'success',
      duration: 1000,
      render: () => (
        <HStack
          paddingBlock={5}
          paddingInline={6}
          bg="success.100"
          borderWidth={'1px'}
          borderColor={'success.500'}
          borderRadius={'lg'}
        >
          <FontAwesomeIcon color="#00AFAB" icon={faCheckCircle} size="lg" />
          <Text color="text.light">{`${data?.value} copied!`}</Text>
        </HStack>
      ),
    })
  }
  return (
    <Text cursor="pointer" onClick={onClick}>
      {data?.value}
    </Text>
  )
}

const Email = {
  Write,
  Read,
}

export default Email
