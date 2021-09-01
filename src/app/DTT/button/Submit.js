import { useState } from 'react'
import { Box, Button, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { compose, filter, identity, includes, map, prop } from 'ramda'

import { onSendMessage } from 'vertx'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { highlightQuestion } from 'redux/app'
import { useError } from 'utils/contexts/ErrorContext'

const Submit = ({ askData, onFinish, parentCode }) => {
  const { questionCode, targetCode, name, disabled } = askData
  // const { error } = useError()
  // const disabledFinal = error || disabledFromBackEnd ? true : false

  const dispatch = useDispatch()

  const onHighlightQuestion = compose(dispatch, highlightQuestion)

  const questions = useSelector(selectCode(parentCode))
  const questionDatas = useSelector(selectAttributes(parentCode, questions))
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
      value: true,
    })
    if (questionCode === 'QUE_SUBMIT') {
      typeof onFinish === 'function' && onFinish()
      setLoading(true)
    }
  }

  return (
    <Box>
      <VStack
        pb="1rem"
        align="start"
        display={disabled && mandatoryQuestionsNoValue.length ? 'block' : 'none'}
      >
        <Text textStyle="tail.error">Please complete all questions marked as mandatory with *</Text>
        <Text textStyle="tail.3">These questions still need to be answered, click to scroll.</Text>
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
                  const el = document.getElementById(question.attributeCode)
                  if (!el) return
                  onHighlightQuestion(question.attributeCode)
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }}
                transition="all 0.2s"
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
        isDisabled={disabled}
        onClick={onClick}
        leftIcon={
          questionCode === 'QUE_SUBMIT_NO' ? (
            <FontAwesomeIcon icon={faTimes} />
          ) : (
            <FontAwesomeIcon icon={faCheck} />
          )
        }
        colorScheme={questionCode === 'QUE_SUBMIT_NO' ? 'red' : 'primary'}
        variant="solid"
      >
        {name}
      </Button>
    </Box>
  )
}

export default Submit
