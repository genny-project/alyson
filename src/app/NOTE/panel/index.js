import { Button } from '@chakra-ui/button'
import { Text, VStack } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import AddNote from '../add_note'
import NoteCard from '../note_card'

const NotePanel = ({ targetCode }) => {
  const notes = useSelector(selectCode(targetCode, 'NOTES'))

  if (!notes || !notes.length)
    return (
      <VStack>
        <Text>No notes found</Text>
        <Button onClick={() => onSendMessage({ code: 'ACT_PRI_EVENT_ACCESS_NOTES', targetCode })}>
          Refetch?
        </Button>
      </VStack>
    )
  return (
    <VStack align="start">
      <AddNote targetCode={targetCode} />
      {notes.map(id => (
        <NoteCard key={id} id={id} />
      ))}
    </VStack>
  )
}

export default NotePanel
