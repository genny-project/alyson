import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import Ask from './Ask'
import { VStack } from '@chakra-ui/react'

const AsksForm = ({ questionCode }) => {
  const childAsks = useSelector(selectCode(questionCode))

  if (!childAsks) return null

  return (
    <VStack>
      {childAsks.map(childAsk => (
        <Ask key={childAsk} parentCode={questionCode} questionCode={childAsk} />
      ))}
    </VStack>
  )
}

export default AsksForm
