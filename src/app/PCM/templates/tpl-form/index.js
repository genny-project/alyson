import { Center, CircularProgress, Text } from '@chakra-ui/react'
import Ask from 'app/ASKS/ask'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { equals, isEmpty } from 'ramda'
import debugOut from 'utils/debug-out'

const TemplateForm = ({ mappedPcm }) => {
  const questionCode = mappedPcm?.PRI_QUESTION_CODE || ''

  if (questionCode) {
    return (
      <Center>
        {/* This width is arbitrary and should probably be controlled by an attribute */}
        <div style={{ width: '80%' }}>
          {/* By using a form ask here, it means the form will work even if the question code passed is not a question group */}
          <FormAsk questionCode={questionCode} parentCode={questionCode} level={0} />
        </div>
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
const FormAsk = ({ parentCode, questionCode, level }) => {
  const attributeCode = useSelector(selectCode(questionCode, 'attributeCode'))
  const targetCode = useSelector(selectCode(questionCode, 'targetCode'))
  if (equals(attributeCode)('QQQ_QUESTION_GROUP')) {
    return (
      <AskGroup
        key={`${parentCode}-${questionCode}`}
        questionCode={questionCode}
        level={level + 1}
        targetCode={targetCode}
      />
    )
  } else {
    return (
      <Ask
        questionCode={questionCode}
        parentCode={parentCode}
        key={`${parentCode}-${questionCode}`}
        passedTargetCode={targetCode}
      />
    )
  }
}

// Takes a question group and maps each of its child asks
const AskGroup = ({ questionCode, level }) => {
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
      <Text fontSize={fontSize}>{title}</Text>
      {childAsks.map(
        code =>
          code === 'QUE_DESCRIPTION' && (
            <FormAsk
              key={`${questionCode}-${code}`}
              parentCode={questionCode}
              questionCode={code}
            />
          ),
      )}
    </div>
  )
}

export default TemplateForm
