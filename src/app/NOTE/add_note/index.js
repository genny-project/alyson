import { useState } from 'react'
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/input'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { IconButton } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import Card from 'app/layouts/components/card'

const AddNote = ({ targetCode, image, title, parentCode, rootCode }) => {
  const sourceCode = useSelector(selectCode('USER'))

  const [noteContent, setNoteContent] = useState('')

  const handleSave = e => {
    e.preventDefault()
    onSendMessage({
      code: 'ACT_PRI_EVENT_SAVE_NOTE',
      targetCode,
      sourceCode,
      rootCode,
      tags: [],
      content: noteContent,
      parentCode,
    })
    setNoteContent('')
  }

  return (
    <Card>
      <form onSubmit={handleSave} style={{ width: '100%' }}>
        <InputGroup>
          <InputLeftElement>{image}</InputLeftElement>
          <Input
            value={noteContent}
            placeholder={`Take a note on ${title}`}
            onChange={e => setNoteContent(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              variant="unstyled"
              borderLeftRadius="0px"
              h="100%"
              onClick={handleSave}
              icon={<FontAwesomeIcon icon={faPlusCircle} />}
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </Card>
  )
}

export default AddNote
