import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  IconButton,
} from '@chakra-ui/react'
import { faStickyNote } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Notes from 'app/NOTE'
import { useSelector, useDispatch } from 'react-redux'
import { closeNotes } from 'redux/app'
import { selectNotes } from 'redux/app/selectors'
import { onSendMessage } from 'vertx'

const NotesDrawer = () => {
  const notes = useSelector(selectNotes)
  const dispatch = useDispatch()

  const isOpen = notes !== null

  return (
    <>
      <IconButton
        position="fixed"
        bottom="5"
        right="5"
        icon={<FontAwesomeIcon icon={faStickyNote} />}
        onClick={() =>
          onSendMessage({
            code: 'ACT_PRI_EVENT_ACCESS_NOTES',
          })
        }
      />
      <Drawer placement="right" size="md" isOpen={isOpen} onClose={() => dispatch(closeNotes())}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <Notes />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default NotesDrawer
