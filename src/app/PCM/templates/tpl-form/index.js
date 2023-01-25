import { useEffect } from 'react'
import { Center, CircularProgress, Flex } from '@chakra-ui/react'
import { compose } from 'ramda'
import { useSelector } from 'react-redux'

import { selectCodeUnary } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import FormAsk from 'app/PCM/templates/tpl-form/form-ask'
import { setCurrentFormQuestions } from 'redux/app'
import { useDispatch } from 'react-redux'
import getCurrentFormQuestions from 'app/PCM/templates/helpers/get-current-form-questions'
import useIsMobileView from 'utils/helpers/is-mobile-view'

const TemplateForm = ({ mappedPcm, depth, ...rest }) => {
  const questionCode = mappedPcm?.PRI_QUESTION_CODE || ''
  const { isMobileView } = useIsMobileView()

  const completeAskData = compose(useSelector, selectCodeUnary(questionCode))('wholeData')

  const currentFormQuestions = getCurrentFormQuestions(completeAskData)

  const dispatch = useDispatch()
  const dispatchSetCurrentFormQuestions = compose(dispatch, setCurrentFormQuestions)

  useEffect(() => {
    dispatchSetCurrentFormQuestions(currentFormQuestions)
  }, [currentFormQuestions, dispatchSetCurrentFormQuestions])

  if (questionCode) {
    return (
      <Flex justifyContent={isMobileView ? 'flex-start' : 'center'}>
        {/* By using a form ask here, it means the form will work even if the question code passed is not a question group */}
        <FormAsk
          first={true}
          questionCode={questionCode}
          parentCode={questionCode}
          level={0}
          properties={rest}
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
