import { Center, CircularProgress, Flex } from '@chakra-ui/react'
import { compose, filter, identity, includes, map, prop, pathOr } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { selectWholeQuestionData, selectAttributes } from 'redux/db/selectors'
import FormAsk from 'app/PCM/templates/tpl-form/form-ask'

const TemplateForm = ({ mappedPcm, depth, ...properties }) => {
  const questionCode = mappedPcm?.PRI_QUESTION_CODE || ''
  const isMobile = useIsMobile()
  const askData = useSelector(selectCode(questionCode, 'wholeData'))
  const targetCode = pathOr(undefined, [0, 'targetCode'])(askData)

  let questionStore = []

  const getQuestionsList = individualAsk => {
    const { questionCode, childAsks } = individualAsk
    questionStore = childAsks?.length ? questionStore : questionStore.concat(questionCode)
    if (childAsks?.length) {
      childAsks?.map(individualAsk => getQuestionsList(individualAsk))
    }
    return questionStore
  }
  askData?.map(individualAsk => getQuestionsList(individualAsk))

  const questionDatas = useSelector(selectWholeQuestionData(questionStore))
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

  console.log('<-------questions---->', { mandatoryQuestionsNoValue })

  if (questionCode) {
    return (
      <Flex justifyContent={isMobile ? 'flex-start' : 'center'}>
        {/* By using a form ask here, it means the form will work even if the question code passed is not a question group */}
        <FormAsk
          questionCode={questionCode}
          parentCode={questionCode}
          level={0}
          properties={properties}
        />
      </Flex>
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

export default TemplateForm
