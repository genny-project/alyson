import { Button, Tag, Text, VStack, Wrap, WrapItem, useTheme } from '@chakra-ui/react'
import { compose, equals, filter, identity, includes, map, prop } from 'ramda'
import { selectAttributes, selectCode, selectWholeQuestionData } from 'redux/db/selectors'
import { useDispatch, useSelector } from 'react-redux'

import { highlightQuestion } from 'redux/app'
import { lojing } from 'utils/constants'
import { onSendMessage } from 'vertx'
import { selectCurrentFormQuestions } from 'redux/app/selectors'
import { useError } from 'utils/contexts/ErrorContext'
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

  const bgColor = equals(clientId)(lojing) ? 'product.secondary' : 'product.primary'

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
      <VStack
        pb="1rem"
        align="start"
        display={disabledFromBackEnd && mandatoryQuestionsNoValue.length ? 'block' : 'none'}
      >
        <Text textStyle="tail.error">{`Please complete all questions marked as mandatory with *`}</Text>
        <Text textStyle="tail.3">{`These questions still need to be answered, click to scroll.`}</Text>
        <Wrap align="start">
          {mandatoryQuestionsNoValue.map(question => (
            <WrapItem key={question.attributeCode}>
              <Tag
                size="sm"
                opacity="0.7"
                _hover={{ opacity: '1' }}
                colorScheme="red"
                cursor="pointer"
                onClick={() => {
                  const element = document.getElementById(question.attributeCode)
                  if (!element) return
                  onHighlightQuestion(question?.attributeCode)
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
              >
                {question.name}
              </Tag>
            </WrapItem>
          ))}
        </Wrap>
      </VStack>

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
        background={bgColor}
        borderRadius={'0.5rem'}
        fontSize={'sm'}
        color={theme.colors.text.dark}
        _hover={{
          background: theme.colors.background.light,
          color: bgColor,
          border: '1px solid',
          borderColor: bgColor,
          variant: 'outline',
        }}
        mb="5"
      >
        {name}
      </Button>
    </>
  )
}

export default Submit
