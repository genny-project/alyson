import ChildButton from './ChildButton'
import { VStack } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const AskButtons = ({ questionCode, onClick }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <VStack alignItems="start" test-id={questionCode}>
      {data.map(childCode => (
        <ChildButton
          onClick={onClick}
          key={childCode}
          questionCode={questionCode}
          childCode={childCode}
        />
      ))}
    </VStack>
  )
}

export default AskButtons
