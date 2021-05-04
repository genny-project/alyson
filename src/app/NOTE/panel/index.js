import { VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import ImageType from 'app/DTT/upload/Image'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import AddNote from '../add_note'
import NoteCard from '../note_card'

const NotePanel = ({ tab: { code: targetCode, title, image }, parentCode }) => {
  const notes = useSelector(selectCode(targetCode, 'NOTES'))

  return (
    <VStack align="start">
      <AddNote
        parentCode={parentCode}
        targetCode={targetCode}
        title={title}
        image={<ImageType.Read data={{ value: image }} config={{ size: 'xs' }} />}
      />
      <Wrap>
        {notes &&
          notes.map(id => (
            <WrapItem key={id}>
              <NoteCard id={id} />
            </WrapItem>
          ))}
      </Wrap>
    </VStack>
  )
}

export default NotePanel
