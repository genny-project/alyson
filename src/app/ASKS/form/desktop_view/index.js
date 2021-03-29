import Ask from 'app/ASKS/ask'
import { VStack, Center, Heading } from '@chakra-ui/react'
import { map } from 'ramda'

const FormDesktopView = ({ title, childAsks, onFinish, questionCode }) => {
  return (
    <Center>
      <VStack maxW="2xl" spacing={4} marginBottom={8}>
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
