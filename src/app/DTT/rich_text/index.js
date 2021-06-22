import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  Text,
  HStack,
} from '@chakra-ui/react'
import { EditorState, convertFromHTML, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { stateToHTML } from 'draft-js-export-html'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import DOMPurify from 'dompurify'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const Write = ({ questionCode, data, onSendAnswer, html }) => {
  const { minCharacterCount = 0, maxCharacterCount } = safelyParseJson(html, {})
  const blocksFromHTML = convertFromHTML(data?.value || '')
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  )

  const [dataValue, setDataValue] = useState(data?.value)
  const [editor, setEditor] = useState(
    !data?.value ? EditorState.createEmpty() : EditorState.createWithContent(state),
  )

  useEffect(() => {
    if (data?.value !== dataValue) {
      setDataValue(data?.value)
      setEditor(EditorState.createWithContent(state))
    }
  }, [data?.value, dataValue, state])

  const curLength = (stateToHTML(editor.getCurrentContent()) || '')
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/&nbsp;/g, ' ').length

  const handleSave = () => {
    if (minCharacterCount || maxCharacterCount) {
      if (minCharacterCount < curLength && curLength < maxCharacterCount) {
        onSendAnswer(stateToHTML(editor.getCurrentContent()))
      }
    } else {
      onSendAnswer(stateToHTML(editor.getCurrentContent()))
    }
  }

  return (
    <Box
      test-id={questionCode}
      w="full"
      border="1px solid #E2E8F0"
      borderRadius="0.375rem"
      p="1rem"
    >
      {minCharacterCount || maxCharacterCount ? (
        !minCharacterCount ? (
          <HStack>
            <Text>{`Please use less than`}</Text>
            <Text color={curLength > maxCharacterCount ? 'red' : 'green'}>{maxCharacterCount}</Text>
            <Text>{`characters`}</Text>
          </HStack>
        ) : (
          <HStack>
            <Text>{`Please use between`}</Text>
            <Text color={curLength < minCharacterCount ? 'red' : 'green'}>{minCharacterCount}</Text>
            <Text>{`and`}</Text>
            <Text color={curLength > maxCharacterCount ? 'red' : 'green'}>{maxCharacterCount}</Text>
            <Text>{`characters`}</Text>
          </HStack>
        )
      ) : null}
      {minCharacterCount || maxCharacterCount ? (
        <Text mb="3">
          {minCharacterCount > curLength
            ? `Keep typing please`
            : curLength > maxCharacterCount
            ? `Too much text`
            : curLength
            ? `That's perfect, thanks!`
            : ''}
        </Text>
      ) : null}

      <Editor
        toolbar={{
          options: ['list', 'textAlign'],
        }}
        editorState={editor}
        onEditorStateChange={setEditor}
        onBlur={handleSave}
        spellCheck={true}
        lang="en"
      />
    </Box>
  )
}
const Read = ({ data, mini }) => {
  if (!data?.value) return null

  const cleanHtml = DOMPurify.sanitize(data.value)

  return mini ? (
    <Popover>
      <PopoverTrigger>
        <Button leftIcon={<FontAwesomeIcon icon={faExpand} />}>{data?.attributeName}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{data.attributeName}</PopoverHeader>
        <PopoverBody>
          <Box pl="4" maxH="20rem" overflowY="scroll">
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <Box px="5" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
  )
}

const RichText = {
  Write,
  Read,
}

export default RichText
