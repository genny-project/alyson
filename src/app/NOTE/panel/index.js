import { HStack, Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import bestTitleAttribute from 'utils/helpers/best-title-attribute'
import AddNote from '../add_note'
import nameOfColumn from '../helpers/name-of-column'
import NoteCard from '../note_card'
import 'app/layouts/components/css/hide-scroll.css'
import { useIsMobile } from 'utils/hooks'
const NotePanel = ({ code, idx, length }) => {
  const notes = useSelector(selectCode(code, 'NOTES')) || []

  const isMobile = useIsMobile()

  return (
    <Card
      w={isMobile ? '90vw' : length === 1 ? '40vw' : '18vw'}
      p="3"
      variant="card0"
      overflow="hidden"
    >
      <VStack className="nobar" align="start" maxH="80vh" overflow="scroll" overflowX="hidden">
        {length > 1 && <Text textStyle="head.3">{nameOfColumn(idx)}</Text>}

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
