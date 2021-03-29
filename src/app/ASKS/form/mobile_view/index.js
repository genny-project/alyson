import Ask from 'app/ASKS/ask'
import { VStack, Center, Heading } from '@chakra-ui/react'
import { map } from 'ramda'

const FormMobileView = ({ title, childAsks, onFinish, questionCode }) => {
  return (
    <Center>
      <VStack width="80vw" spacing={4} marginBottom={8}>
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

export default FormMobileView
