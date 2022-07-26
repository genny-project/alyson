import { Box, Button, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'
import { compose, filter, identity, includes, map, prop } from 'ramda'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { highlightQuestion } from 'redux/app'
import { onSendMessage } from 'vertx'
import { useError } from 'utils/contexts/ErrorContext'
import { useState } from 'react'

const Submit = ({ askData, onFinish, parentCode }) => {
  const { questionCode, targetCode, name, disabled: disabledFromBackEnd } = askData
  const { errorState } = useError()
  const dispatch = useDispatch()
  const onHighlightQuestion = compose(dispatch, highlightQuestion)

  const errorStateValues = Object.values(errorState)
  const hasError = includes(true)(errorStateValues)
  const isDisabled = hasError || disabledFromBackEnd

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

  const bgColor = 'product.secondary' || 'primary.900'

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
      processId: askData.processId,
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
        isDisabled={isDisabled}
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
        borderRadius={'full'}
        paddingBlock="6px"
        paddingInline="20px"
        background={bgColor}
        _hover={{
          background: 'orange',
        }}
      >
        {name}
      </Button>
    </Box>
  )
}

export default Submit
