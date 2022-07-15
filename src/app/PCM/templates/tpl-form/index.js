import { Center, CircularProgress, Text } from '@chakra-ui/react'
import { equals, isEmpty } from 'ramda'

import Ask from 'app/ASKS/ask'
import debugOut from 'utils/debug-out'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TemplateForm = ({ mappedPcm, ...properties }) => {
  const questionCode = mappedPcm?.PRI_QUESTION_CODE || ''

  if (questionCode) {
    return (
      <Center>
        {/* By using a form ask here, it means the form will work even if the question code passed is not a question group */}
        <FormAsk
          questionCode={questionCode}
          parentCode={questionCode}
          level={0}
          properties={properties}
        />
      </Center>
    )
  } else {
    console.error('Attempting to display a TPL_FORM for a PCM without a question code!')
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    )
  }
}

// Handles switching between individual asks and question groups
const FormAsk = ({ parentCode, questionCode, level, properties }) => {
  const attributeCode = useSelector(selectCode(questionCode, 'attributeCode'))
  const targetCode = useSelector(selectCode(questionCode, 'targetCode'))

  if (equals(attributeCode)('QQQ_QUESTION_GROUP')) {
    return (
      <AskGroup
        key={`${parentCode}-${questionCode}`}
        questionCode={questionCode}
        level={level + 1}
        targetCode={targetCode}
        properties={properties}
      />
    )
  } else {
    return (
      <Ask
        questionCode={questionCode}
        parentCode={parentCode}
        key={`${parentCode}-${questionCode}`}
        passedTargetCode={targetCode}
        properties={properties}
      />
    )
  }
}

// Takes a question group and maps each of its child asks
const AskGroup = ({ questionCode, level, properties }) => {
  const childAsks = useSelector(selectCode(questionCode)) || []
  const title = useSelector(selectCode(questionCode, 'title')) || ''

  const levels = {
    0: '3xl',
    1: '3xl',
    2: '2xl',
    3: 'xl',
  }

  const fontSize = levels[level] || 'xl'

  if (isEmpty(childAsks)) {
    debugOut.error(`${questionCode} has no child asks! (AskGroup in TPL_FORM)`)
  }
  return (
    <div>
      <Text fontSize={fontSize} mb="5">
        {title}
      </Text>
      {childAsks.map(code => (
        <FormAsk
          key={`${questionCode}-${code}`}
          parentCode={questionCode}
          questionCode={code}
          properties={properties}
        />
      ))}
    </div>
  )
}

export default TemplateForm
