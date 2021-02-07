import ChildButton from './ChildButton'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Stack } from '@chakra-ui/react'

const AskButtons = ({ questionCode, direction = 'row', size = 'sm' }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <Stack direction={direction} test-id={questionCode}>
      {data.map(childCode => (
        <ChildButton
          size={size}
          key={childCode}
          questionCode={questionCode}
          childCode={childCode}
        />
      ))}
    </Stack>
  )
}

export default AskButtons
