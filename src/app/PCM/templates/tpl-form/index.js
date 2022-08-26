import { useEffect } from 'react'
import { Center, CircularProgress, Flex } from '@chakra-ui/react'
import { compose } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import FormAsk from 'app/PCM/templates/tpl-form/form-ask'
import { setCurrentFormQuestions } from 'redux/app'
import { useDispatch } from 'react-redux'
import getCurrentFormQuestions from 'app/PCM/templates/helpers/get-current-form-questions'

const TemplateForm = ({ mappedPcm, depth, ...properties }) => {
  const questionCode = mappedPcm?.PRI_QUESTION_CODE || ''
  const isMobile = useIsMobile()
  const completeAskData = useSelector(selectCode(questionCode, 'wholeData'))

  const currentFormQuestions = getCurrentFormQuestions(completeAskData)

  const dispatch = useDispatch()
  const dispatchSetCurrentFormQuestions = compose(dispatch, setCurrentFormQuestions)

  useEffect(() => {
    dispatchSetCurrentFormQuestions(currentFormQuestions)
  }, [currentFormQuestions, dispatchSetCurrentFormQuestions])

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
    console.warn('Attempting to display a TPL_FORM for a PCM without a question code!')
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    )
  }
}

export default TemplateForm
