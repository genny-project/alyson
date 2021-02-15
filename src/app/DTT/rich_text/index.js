import { useState, useEffect } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { EditorState, convertFromHTML, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { stateToHTML } from 'draft-js-export-html'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const Write = ({ questionCode, data, onSendAnswer, description }) => {
  const blocksFromHTML = convertFromHTML(data?.value)
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  )

  const [dataValue, setDataValue] = useState(data?.value)
  const [edit, setEdit] = useState(!data?.value)
  const [editor, setEditor] = useState(
    !data?.value ? EditorState.createEmpty() : EditorState.createWithContent(state),
  )

  useEffect(() => {
    if (data?.value !== dataValue) {
      setDataValue(data?.value)
      setEdit(false)
      setEditor(EditorState.createWithContent(state))
    }
  }, [data?.value, dataValue, edit, state])

  const handleSave = () => {
    onSendAnswer(stateToHTML(editor.getCurrentContent()))
    setEdit(false)
  }

  return edit ? (
    <Box w="2xl" border="1px solid #E2E8F0" borderRadius="0.375rem" p="1rem">
      <Editor
        test-id={questionCode}
        editorState={editor}
        onEditorStateChange={setEditor}
        placeholder={description}
      />
      <Button
        test-id={questionCode + '-save'}
        m="2"
        leftIcon={<FontAwesomeIcon icon={faSave} />}
        onClick={handleSave}
        variant="outline"
        color="teal.500"
      >
        Save
      </Button>
    </Box>
  ) : (
    <Box w="2xl" border="1px solid #E2E8F0" borderRadius="0.375rem" p="1rem">
      <div style={{ padding: '1rem' }} dangerouslySetInnerHTML={{ __html: data.value }} />
      <Button m="2" leftIcon={<FontAwesomeIcon icon={faEdit} />} onClick={() => setEdit(true)}>
        Edit
      </Button>
    </Box>
  )
}
const Read = ({ data }) => {
  if (!data?.value) return null
  return <div dangerouslySetInnerHTML={{ __html: data.value }} />
}

const RichText = {
  Write,
  Read,
}

export default RichText
