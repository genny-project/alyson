import { Button } from '@chakra-ui/button'
import { Text, VStack } from '@chakra-ui/layout'
import ImageType from 'app/DTT/upload/Image'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import AddNote from '../add_note'
import NoteCard from '../note_card'

const NotePanel = ({ tab: { code: targetCode, title, image } }) => {
  const notes = useSelector(selectCode(targetCode, 'NOTES'))

  return (
    <VStack align="start">
      <AddNote
        targetCode={targetCode}
        title={title}
        image={<ImageType.Read data={{ value: image }} config={{ size: 'xs' }} />}
      />
      {!notes ? (
        <VStack>
          <Text>No notes found</Text>
          <Button onClick={() => onSendMessage({ code: 'ACT_PRI_EVENT_ACCESS_NOTES', targetCode })}>
            Refetch?
          </Button>
        </VStack>
      ) : (
        notes.map(id => <NoteCard key={id} id={id} />)
      )}
    </VStack>
  )
}

export default NotePanel
