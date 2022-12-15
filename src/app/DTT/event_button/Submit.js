import { Button, useTheme } from '@chakra-ui/react'
import { compose, filter, identity, includes, map, prop } from 'ramda'
import { selectAttributes, selectCode, selectWholeQuestionData } from 'redux/db/selectors'
import { useDispatch, useSelector } from 'react-redux'

import { highlightQuestion } from 'redux/app'
import { onSendMessage } from 'vertx'
import { selectCurrentFormQuestions } from 'redux/app/selectors'
import { useError } from 'utils/contexts/ErrorContext'
import useProductColors from 'utils/productColors'
import { useState } from 'react'

const Submit = ({ askData, onFinish, parentCode, clientId }) => {
  const { questionCode, targetCode, name, disabled: disabledFromBackEnd } = askData
  const { errorState } = useError()
  const dispatch = useDispatch()
  const onHighlightQuestion = compose(dispatch, highlightQuestion)
  const theme = useTheme()

  const errorStateValues = Object.values(errorState)
  const hasError = includes(true)(errorStateValues)
  const isDisabled = hasError || disabledFromBackEnd
  const attrCode = useSelector(selectCode(questionCode, 'attributeCode'))
  const questions = useSelector(selectCurrentFormQuestions)
  const questionDatas = useSelector(selectWholeQuestionData(questions))
  const mandatoryQuestions = filter(prop('mandatory'), questionDatas)
  const mandatoryAttributes = map(prop('attributeCode'))(mandatoryQuestions)
  const attributeData = filter(
    identity,
    useSelector(selectAttributes(targetCode, mandatoryAttributes)),
  )
  const mandatoryAttributesNoValue = compose(
    map(prop('attributeCode')),
    filter(attr => !attr.value),
  )(attributeData)

  const { buttonBackgroundColor } = useProductColors()

  const mandatoryQuestionsNoValue = filter(
    q => q.questionCode !== 'QUE_SUBMIT' && includes(q.attributeCode, mandatoryAttributesNoValue),
  )(mandatoryQuestions)

  const [loading, setLoading] = useState(false)

  const onClick = () => {
    onSendMessage({
      code: questionCode,
      rootCode: parentCode,
      parentCode,
      targetCode,
      attributeCode: attrCode,
      processId: askData.processId,
    })
    if (questionCode === 'QUE_SUBMIT') {
      typeof onFinish === 'function' && onFinish()
      setLoading(true)
    }
  }

  return (
    <>
      <Button
        isLoading={loading}
        test-id={questionCode}
        isDisabled={isDisabled}
        onClick={onClick}
        variant="solid"
        minW={`6.5rem`}
        paddingBlock="0.38rem"
        paddingInline="1.25rem"
        mr={2}
        mb="5"
        background={buttonBackgroundColor}
        borderRadius={'0.5rem'}
        fontSize={'sm'}
        color={theme.colors.text.dark}
        _hover={{
          background: theme.colors.background.light,
          color: buttonBackgroundColor,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: buttonBackgroundColor,
          variant: 'outline',
        }}
      >
        {name}
      </Button>
    </>
  )
}

export default Submit
