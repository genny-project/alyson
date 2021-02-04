import ChildButton from './ChildButton'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { HStack } from '@chakra-ui/react'

const AskButtons = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <HStack>
      {data.map(childCode => (
        <ChildButton questionCode={questionCode} childCode={childCode} />
      ))}
    </HStack>
  )
}

export default AskButtons
