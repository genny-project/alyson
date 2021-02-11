import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import Ask from 'app/ASKS/ask'
import { VStack, Center, Heading } from '@chakra-ui/react'

const AsksForm = ({ questionCode, onFinish }) => {
  const childAsks = useSelector(selectCode(questionCode)) || []
  const title = useSelector(selectCode(questionCode, 'title'))

  return (
    <Center>
      <VStack spacing={4} marginBottom={8}>
        <Heading>{title}</Heading>
        {childAsks.map(childAsk => (
          <Ask
            onFinish={onFinish}
            key={childAsk}
            parentCode={questionCode}
            questionCode={childAsk}
          />
        ))}
      </VStack>
    </Center>
  )
}

export default AsksForm
