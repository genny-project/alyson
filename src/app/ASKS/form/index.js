import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import Ask from 'app/ASKS/ask'
import { VStack, Center } from '@chakra-ui/react'

const AsksForm = ({ questionCode }) => {
  const childAsks = useSelector(selectCode(questionCode))

  if (!childAsks) return null

  return (
    <Center p="8">
      <VStack>
        {childAsks.map(childAsk => (
          <Ask key={childAsk} parentCode={questionCode} questionCode={childAsk} />
        ))}
      </VStack>
    </Center>
  )
}

export default AsksForm
