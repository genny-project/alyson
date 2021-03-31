import { VStack } from '@chakra-ui/layout'
import ImageType from 'app/DTT/upload/Image'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
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
      {notes && notes.map(id => <NoteCard key={id} id={id} />)}
    </VStack>
  )
}

export default NotePanel
