import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import 'app/layouts/components/css/hide-scroll.css'
import { reverse } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { closeDrawer } from 'redux/app'
import { selectCode } from 'redux/db/selectors'
import bestTitleAttribute from 'utils/helpers/best-title-attribute'
import { useIsMobile } from 'utils/hooks'
import AddNote from '../add_note'
import nameOfColumn from '../helpers/name-of-column'
import NoteCard from '../note_card'

const NotePanel = ({ code, idx, length }) => {
  const notes = useSelector(selectCode(code, 'NOTES')) || []

  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  return (
    <Card
      w={isMobile || length > 1 ? '60vw' : length === 1 ? '40vw' : '18vw'}
      p="3"
      variant="card0"
      overflow="scroll"
      h="88vh"
      overflowX="hidden"
    >
      <VStack className="nobar" align="start">
        {length > 1 && <Text textStyle="head.3">{nameOfColumn(idx)}</Text>}

        <HStack>
          <Attribute code={code} attribute="PRI_IMAGE_URL" parentCode="NOTES" />
          <VStack align="start">
            <Attribute code={code} attribute={bestTitleAttribute(code)} />
          </VStack>

          <Box overflow="hidden" borderRadius="50%" position="absolute" zIndex="modal" right="6">
            <IconButton
              onClick={onClose}
              size="sm"
              color="white"
              bg="black"
              icon={<FontAwesomeIcon opacity={50} icon={faTimes} />}
            />
          </Box>
        </HStack>

        <AddNote code={code} />

        {reverse(notes).map((id, idx) => (
          <NoteCard key={idx + id} id={id} idx={idx} notes={notes} />
        ))}
      </VStack>
    </Card>
  )
}

export default NotePanel
