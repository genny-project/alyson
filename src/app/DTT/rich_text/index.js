import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './style.css'

import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import { useEffect, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DOMPurify from 'dompurify'
import { Editor } from 'react-draft-wysiwyg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { getIsInvalid } from 'utils/functions'
import { isNotNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined.js'
import removeHtmlTags from 'utils/helpers/remove-html-tags'
import safelyParseJson from 'utils/helpers/safely-parse-json'
import { selectFieldMessage } from 'redux/app/selectors'
import { stateToHTML } from 'draft-js-export-html'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useSelector } from 'react-redux'

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  html,
  regexPattern,
  errorMessage,
  placeholder,
  parentCode,
  placeholderName,
}) => {
  const { minCharacterCount = 0, maxCharacterCount } = safelyParseJson(html, {})
  const blocksFromHTML = convertFromHTML(data?.value || '')
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap,
  )
  const [userInput, setUserInput] = useState(data?.value)
  const [dataValue, setDataValue] = useState(data?.value)
  const [editor, setEditor] = useState(
    !data?.value ? EditorState.createEmpty() : EditorState.createWithContent(state),
  )
  const [errorStatus, setErrorStatus] = useState(false)
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()
  const userInputWithoutHtmlTags = removeHtmlTags(userInput)
  const fieldMessageObject = useSelector(selectFieldMessage)
  const fieldMessage = fieldMessageObject[`${parentCode}@${questionCode}`]
  let hasFieldMessage = isNotNullOrUndefinedOrEmpty(fieldMessage)
  let hasErrorMessage = isNotNullOrUndefinedOrEmpty(errorMessage)

  const userInputWithoutLineBreaks = userInputWithoutHtmlTags
    ?.replace(/(\r\n|\n|\r|-|\xA0)/gi, '')
    ?.replace(/(<([^>]+)>)/gi, '')
    ?.replace(/^.*\s{2,}.*$/, '')

  const isInvalid = getIsInvalid(userInputWithoutLineBreaks, questionCode)(RegExp(regexPattern))

  const handleEditorChange = () => {
    const blocks = convertToRaw(editor.getCurrentContent()).blocks
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('')
    setUserInput(value)
  }

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  useEffect(() => {
    if (data?.value !== dataValue) {
      setDataValue(data?.value)
      setEditor(EditorState.createWithContent(state))
    }
  }, [data?.value, dataValue, state])

  // const curLength = (stateToHTML(editor.getCurrentContent()) || '')
  //   .replace(/(<([^>]+)>)/gi, '')
  //   .replace(/&nbsp;/g, ' ').length

  const curLength = userInputWithoutLineBreaks?.length

  const handleSave = () => {
    if (minCharacterCount || maxCharacterCount) {
      if (minCharacterCount < curLength && curLength < maxCharacterCount) {
        onSendAnswer(stateToHTML(editor.getCurrentContent()))
      }
    } else {
      onSendAnswer(stateToHTML(editor.getCurrentContent()))
    }
    dispatchFieldMessage({ payload: questionCode })
  }

  return (
    <>
      <Box
        test-id={questionCode}
        w="full"
        border="1px"
        borderColor="product.gray"
        borderRadius={'calc(0.24rem - 1px)'}
        paddingBlock={3}
        paddingInline={6}
        bg="product.gray"
        fontSize={'sm'}
        fontWeight={'medium'}
        _hover={{
          borderColor: 'product.gray',
          boxShadow: 'lg',
        }}
        _focusWithin={{
          borderColor: 'product.secondary',
          boxShadow: 'lg',
        }}
      >
        {minCharacterCount || maxCharacterCount ? (
          !minCharacterCount ? (
            <HStack>
              <Text>{`Please use less than`}</Text>
              <Text color={curLength > maxCharacterCount ? 'red' : 'green'}>
                {maxCharacterCount}
              </Text>
              <Text>{`characters`}</Text>
            </HStack>
          ) : (
            <HStack>
              <Text>{`Please use between`}</Text>
              <Text color={curLength < minCharacterCount ? 'red' : 'green'}>
                {minCharacterCount}
              </Text>
              <Text>{`and`}</Text>
              <Text color={curLength > maxCharacterCount ? 'red' : 'green'}>
                {maxCharacterCount}
              </Text>
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
          id={questionCode}
          editorState={editor}
          onEditorStateChange={setEditor}
          onBlur={handleSave}
          onChange={handleEditorChange}
          spellCheck={true}
          lang="en"
          placeholder={placeholderName || ' '}
        />
      </Box>
      {errorStatus && (
        <VStack alignItems="start">
          {(hasFieldMessage || hasErrorMessage) && (
            <Text textStyle="tail.error" mt={2}>
              {hasFieldMessage ? fieldMessage : errorMessage}
            </Text>
          )}
        </VStack>
      )}
    </>
  )
}

const Read = ({ data, mini, config = {} }) => {
  const { noOfLines } = config
  const { isOpen, onOpen, onClose } = useDisclosure()

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
  ) : noOfLines ? (
    <VStack onClick={onOpen}>
      <Box p="0px" dangerouslySetInnerHTML={{ __html: cleanHtml }} {...config} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box m={7} dangerouslySetInnerHTML={{ __html: cleanHtml }} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="primary" w="full" onClick={onClose}>
              {`Close`}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  ) : (
    <Box p="0px" dangerouslySetInnerHTML={{ __html: cleanHtml }} {...config} />
  )
}
const RichText = {
  Write,
  Read,
}
export default RichText
