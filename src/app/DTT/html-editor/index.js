import { Box, HStack } from '@chakra-ui/react'
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
    <HStack justify={'space-evenly'} align={'stretch'}>
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
        <HtmlEditorPreview html={userInput} inModal={true} />
      </Box>
    </HStack>
  )
}

const Read = ({ data, config }) => {
  return <HtmlEditorPreview html={data?.value || ''} inModal={config?.inModal} />
}

const HtmlEditor = {
  Write,
  Read,
}

export default HtmlEditor
