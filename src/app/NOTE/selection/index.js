import { HStack, Text } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { selectNotes } from 'redux/app/selectors'

const Selection = () => {
  const notes = useSelector(selectNotes)

  if (!notes?.Tab_Intern) return null

  return (
    <HStack>
      <Text>{`${notes.Tab_Intern.title}`}</Text>
      <Text>{`is applying for`}</Text>
      <Text>{`${notes.Tab_Application.title}`}</Text>
      <Text>{`at ${notes['Tab_Host Company']['title']}`}</Text>
    </HStack>
  )
}

export default Selection
