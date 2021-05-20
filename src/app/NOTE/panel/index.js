import { HStack, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import bestTitleAttribute from 'utils/helpers/best-title-attribute'
import AddNote from '../add_note'
import NoteCard from '../note_card'

const NotePanel = ({ code }) => {
  const notes = useSelector(selectCode(code, 'NOTES')) || []

  return (
    <Card p="3" variant="card0">
      <VStack align="start">
        <HStack>
          <Attribute code={code} attribute="PRI_IMAGE_URL" />
          <VStack align="start">
            <Attribute code={code} attribute={bestTitleAttribute(code)} />
          </VStack>
        </HStack>

        <AddNote code={code} />

        {notes.map(id => (
          <NoteCard key={id} id={id} />
        ))}
      </VStack>
    </Card>
  )
}

export default NotePanel
