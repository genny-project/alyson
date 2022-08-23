import { VStack, Box, HStack, Text } from '@chakra-ui/react'

import { useState } from 'react'
import HtmlEditorPreview from './html-editor-preview'

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
  const [userInput, setUserInput] = useState('')

  const handleChange = event => {
    setUserInput(event.target.value)
    event.target.style.height = 'inherit'
    event.target.style.height = `${event.target.scrollHeight}px`
  }

  return (
    <HStack justify={'space-evenly'} align={'flex-start'}>
      <Box width={'49%'}>
        <VStack width={'100%'} align="flex-start">
          <Text>HTML Code</Text>
          <Box border={'1px'} width={'100%'}>
            <tt style={{ width: '100%' }}>
              <textarea
                value={userInput}
                onChange={handleChange}
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </tt>
          </Box>
        </VStack>
      </Box>
      <Box width={'49%'}>
        <VStack width={'100%'} align="flex-start">
          <Text>Output</Text>
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
  return <div></div>
}

const HtmlEditor = {
  Write,
  Read,
}

export default HtmlEditor
