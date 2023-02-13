import './style.css'

import {
  Box,
  Button,
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
import { useEffect, useRef, useState } from 'react'

import { ACTIONS } from 'utils/contexts/ErrorReducer'
import DOMPurify from 'dompurify'
import { Editor } from '@tinymce/tinymce-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpand } from '@fortawesome/free-solid-svg-icons'
import { getIsInvalid } from 'utils/functions'
import removeHtmlTags from 'utils/helpers/remove-html-tags'
import { useError } from 'utils/contexts/ErrorContext'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  html,
  regexPattern,
  errorMessage,
  placeholder,
}) => {
  const editorRef = useRef(null)

  const [userInput, setUserInput] = useState(data?.value)

  const [errorStatus, setErrorStatus] = useState(false)
  const { dispatch } = useError()
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const userInputWithoutHtmlTags = removeHtmlTags(userInput)

  const userInputWithoutLineBreaks = userInputWithoutHtmlTags
    ?.replace(/(\r\n|\n|\r|-|\xA0)/gi, '')
    ?.replace(/(<([^>]+)>)/gi, '')
    ?.replace(/^.*\s{2,}.*$/, '')

  const isInvalid = getIsInvalid(userInputWithoutLineBreaks, questionCode)(RegExp(regexPattern))

  useEffect(() => {
    isInvalid ? setErrorStatus(true) : setErrorStatus(false)
  }, [isInvalid])

  useEffect(() => {
    isInvalid
      ? dispatch({ type: ACTIONS.SET_TO_TRUE, payload: questionCode })
      : dispatch({ type: ACTIONS.SET_TO_FALSE, payload: questionCode })
  }, [dispatch, isInvalid, questionCode])

  const handleEditorChange = () => {
    const value = editorRef.current.getContent()
    setUserInput(value)
  }

  const handleSave = () => {
    onSendAnswer(userInput)
    dispatchFieldMessage({ payload: questionCode })
  }

  return (
    <>
      <Box
        test-id={questionCode}
        w="full"
        border="1px solid #E2E8F0"
        borderRadius="0.375rem"
        p="1rem"
      >
        <Editor
          apiKey="tonka5x5oam6nkqq5ydmzivkgkctew1ifpk4sy8zff3ilco8"
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={userInput ? userInput : ''}
          id={questionCode}
          onBlur={handleSave}
          onEditorChange={handleEditorChange}
          spellCheck={true}
          lang="en"
          placeholder={placeholder || ' '}
          init={{
            height: 500,
            newline_behavior: 'block',
            plugins: [
              'preview',
              'searchreplace',
              'save',
              'code',
              'fullscreen',
              'image',
              'link',
              'media',
              'template',
              'table',
              'nonbreaking',
              'advlist',
              'lists',
              'fullpage',
            ],
            toolbar: [
              'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor | ltr rtl',
            ],
          }}
        />
      </Box>

      {errorStatus && (
        <Text textStyle="tail.error" mt={2}>
          {errorMessage}
        </Text>
      )}
    </>
  )
}

const Read = ({ data, mini, config = {} }) => {
  const { noOfLines } = config
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!data?.value) return null
  const cleanHtml = DOMPurify.sanitize(data.value)

  console.log('HERERE', { data })

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
const HTMLEditorTinyMCE = {
  Write,
  Read,
}
export default HTMLEditorTinyMCE
