import { Box, Text as ChakraText, HStack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import HtmlEditorPreview from './html-editor-preview'
import TextArea from '../text_area'
import purify from './purify'

const Write = ({
  questionCode,
  data,
  onSendAnswer,
  regexPattern,
  errorMessage,
  parentCode,
  placeholderName,
  attributeCode,
  targetCode,
  mandatory,
}) => {
  const [userInput, setuserInput] = useState(data?.value || '')

  const handleChange = event => {
    setuserInput(event.target.value)
    event.target.style.height = 'inherit'
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  return (
    <HStack justify={'space-evenly'} align={'flex-start'}>
      <Box width={'49%'}>
        <tt>
          <TextArea.Write
            questionCode={questionCode}
            data={data}
            onSendAnswer={onSendAnswer}
            regexPattern={regexPattern}
            errorMessage={errorMessage}
            parentCode={parentCode}
            placeholderName={placeholderName}
            attributeCode={attributeCode}
            targetCode={targetCode}
            mandatory={mandatory}
            onChange={handleChange}
            sanatise={purify}
          />
        </tt>
      </Box>
      <Box width={'49%'}>
        <VStack width={'100%'} align="flex-start">
          <ChakraText>Output</ChakraText>
          <Box borderTop="1px" width={'100%'}>
            <Box width={'100%'} padding={1}>
              <HtmlEditorPreview html={userInput} />
            </Box>
          </Box>
        </VStack>
      </Box>
    </HStack>
  )
}

const Read = ({ data, config }) => {
  return <HtmlEditorPreview html={data?.value || ''} />
}

const HtmlEditor = {
  Write,
  Read,
}

export default HtmlEditor
