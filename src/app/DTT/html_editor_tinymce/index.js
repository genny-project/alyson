import 'app/DTT/html_editor_tinymce/style.css'

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
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { faCheckCircle, faExpand } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Editor } from '@tinymce/tinymce-react'
import useStyles from 'app/DTT/inputStyles'
import MandatorySymbol from 'app/layouts/components/form/mandatory-symbol'
import DOMPurify from 'dompurify'
import { compose } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { projectCodeString } from 'utils/constants'
import { useError } from 'utils/contexts/ErrorContext'
import { ACTIONS } from 'utils/contexts/ErrorReducer'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { isNotStringifiedEmptyArray } from 'utils/functionals'
import { getIsInvalid } from 'utils/functions'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import removeHtmlTags from 'utils/helpers/remove-html-tags'
import useProductColors from 'utils/productColors'

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMessage,
  placeholderName,
  mandatory,
}) => {
  const realm = useGetProductName().toLowerCase()
  const isProductInternMatch = useIsProductInternmatch()
  const [isFocused, setIsFocused] = useState(false)

  const { labelTextColor } = useProductColors()

  const projectCode = compose(useSelector, selectCode)(projectCodeString)
  const tinyMCEKEY = useSelector(selectCode(projectCode, 'ENV_TINY_MCE_API_KEY'))?.value || ''

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

  const { errorState } = useError()
  const { fieldState } = useIsFieldNotEmpty()

  const failedValidation = errorState[questionCode]
  const fieldNotEmpty = fieldState[questionCode]
  const hasValidData = userInput && !isInvalid

  const { inputStyles, labelStyles } = useStyles(hasValidData, isFocused)

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
    <Box position={'relative'} mt={6} transition="all 0.25s ease">
      <HStack paddingStart={isProductInternMatch ? 6 : 12} {...labelStyles} top={'-1.5rem'}>
        {placeholderName && (
          <MandatorySymbol
            placeholderName={placeholderName}
            labelTextColor={isProductInternMatch ? `${realm}.primary` : labelTextColor}
            realm={realm}
            mandatory={mandatory}
          />
        )}

        {(!failedValidation && fieldNotEmpty) ||
        (!failedValidation && userInput && isNotStringifiedEmptyArray(userInput)) ? (
          <FontAwesomeIcon opacity="0.5" color="green" icon={faCheckCircle} />
        ) : null}
      </HStack>

      <Box className={`editor-${realm}`} test-id={questionCode} {...inputStyles}>
        <Editor
          apiKey={tinyMCEKEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={userInput ? userInput : ''}
          id={questionCode}
          onFocus={() => setIsFocused(true)}
          onBlur={handleSave}
          onEditorChange={handleEditorChange}
          spellCheck={true}
          lang="en"
          placeholder={placeholderName || ' '}
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
            valid_children: '+body[style],+head[style]',
            toolbar: [
              'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor | ltr rtl',
            ],
          }}
        />
      </Box>

      {errorStatus && (
        <Text
          textStyle="tail.error"
          color={isProductInternMatch ? `${realm}.secondary` : 'error.500'}
          mt={2}
        >
          {errorMessage}
        </Text>
      )}
    </Box>
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
const HTMLEditorTinyMCE = {
  Write,
  Read,
}
export default HTMLEditorTinyMCE
