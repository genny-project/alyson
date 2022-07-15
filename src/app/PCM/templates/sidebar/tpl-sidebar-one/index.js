import EvtButton from 'app/PCM/components/evt-button'
import { VStack } from '@chakra-ui/react'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'

const TemplateSidebarOne = ({ mappedPcm }) => {
  return (
    <VStack test-id={mappedPcm.PRI_QUESTION_CODE} justifyContent="center" spacing={12}>
      {mapQuestionGroup((ask, question) => {
        return (
          <EvtButton
            key={ask?.attributeCode || ''}
            questionCode={mappedPcm.PRI_QUESTION_CODE}
            childCode={ask?.questionCode || ''}
            iconId={question?.icon || ''}
          />
        )
      })(mappedPcm.PRI_QUESTION_CODE)}
    </VStack>
  )
}

export default TemplateSidebarOne