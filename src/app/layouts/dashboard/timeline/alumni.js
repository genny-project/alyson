import { VStack, Text, useColorModeValue, Spacer, HStack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const AlumniPage = () => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const userCode = useSelector(selectCode('USER'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))?.valueString
  return (
    <VStack
      w="50%"
      bg={bg}
      h="min-content"
      spacing={10}
      m={10}
      textAlign="center"
      p="5"
      overflowY="scroll"
    >
      <Text textStyle="head.2">{`Congratulations ${name}, you have successfully completed the program!`}</Text>
      <Spacer />
      <Text textStyle="head.2">{`And we are delighted to have you as our Alumni.`}</Text>
    </VStack>
  )
}

export default AlumniPage
