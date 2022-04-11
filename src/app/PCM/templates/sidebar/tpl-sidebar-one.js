import { VStack } from '@chakra-ui/react'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'
import EvtButton from 'app/PCM/components/evt-button'

const TemplateSidebarOne = ({ mappedPcm }) => {
  return (
    <VStack test-id={mappedPcm.PRI_QUESTION_CODE} justifyContent="center">
      {mapQuestionGroup(mappedPcm.PRI_QUESTION_CODE)((questionCode, attributeCode, iconId) => {
        return (
          <EvtButton
            key={attributeCode}
            questionCode={mappedPcm.PRI_QUESTION_CODE}
            childCode={questionCode}
            iconId={iconId}
          />
        )
      })}
    </VStack>
  )
}

export default TemplateSidebarOne
