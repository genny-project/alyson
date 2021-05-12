import { Box, Button, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { compose, filter, identity, includes, map, prop } from 'ramda'
import { highlightQuestion } from 'redux/app'

const Submit = ({ askData, onFinish, parentCode }) => {
  const { questionCode, targetCode, name, disabled } = askData

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
    q => q.questionCode !== 'QUE_SUBMIT' && !includes(mandatoryAttributesNoValue, q.attributeCode),
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
      <VStack pb="1rem" align="start" visibility={disabled ? 'visible' : 'hidden'}>
        <Text textStyle="body.error">Please complete all questions marked as mandatory with *</Text>
        <Text>These questions still need to be answered, click to scroll.</Text>
        <Wrap align="start">
          {mandatoryQuestionsNoValue.map(question => (
            <WrapItem key={question.attributeCode}>
              <Tag
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
