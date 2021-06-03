import { useState } from 'react'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { IconButton } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import { selectNotes } from 'redux/app/selectors'

const AddNote = ({ code }) => {
  const sourceCode = useSelector(selectCode('USER'))
  const parentCode = useSelector(selectNotes)

  const [noteContent, setNoteContent] = useState('')

  const handleSave = e => {
    e.preventDefault()
    onSendMessage(
      {
        code: `ACT_PRI_EVENT_SAVE_NOTE`,
        targetCode: code,
        sourceCode,
        tags: [],
        content: noteContent,
        parentCode,
      },
      { redirect: false },
    )
    setNoteContent('')
  }

  return (
    <form onSubmit={handleSave} style={{ width: '100%' }}>
      <InputGroup bg="whiteAlpha.500">
        <Input
          value={noteContent}
          placeholder={`Take a note`}
          onChange={e => setNoteContent(e.target.value)}
        />
        <InputRightElement>
          <IconButton
            variant="unstyled"
            onClick={handleSave}
            color="blue.500"
            icon={<FontAwesomeIcon icon={faPlusCircle} />}
          />
        </InputRightElement>
      </InputGroup>
    </form>
  )
}

export default AddNote
