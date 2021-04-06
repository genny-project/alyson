import Ask from 'app/ASKS/ask'
import { VStack, Center, Heading, useColorModeValue } from '@chakra-ui/react'
import { map } from 'ramda'

const FormDesktopView = ({ title, childAsks, onFinish, questionCode, shadow }) => {
  const bgColor = useColorModeValue('white', 'whiteAlpha.100')

  return (
    <Center
      bgColor={bgColor}
      borderRadius="md"
      shadow={shadow ? 'base' : ''}
      mr="10vw"
      ml="10vw"
      pt="1rem"
    >
      <VStack p="3" spacing={8} marginBottom={8}>
        <Heading>{title}</Heading>
        {map(childAsk => (
          <Ask
            onFinish={onFinish}
            key={childAsk}
            parentCode={questionCode}
            questionCode={childAsk}
          />
        ))(childAsks)}
      </VStack>
    </Center>
  )
}

export default FormDesktopView
