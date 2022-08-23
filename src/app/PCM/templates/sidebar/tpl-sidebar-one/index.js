import EvtButton from 'app/PCM/components/evt-button'
import { Grid } from '@chakra-ui/react'
import mapQuestionGroup from 'app/PCM/helpers/map-question-grp'

const TemplateSidebarOne = ({ mappedPcm, depth }) => {
  return (
    <Grid
      test-id={mappedPcm.PRI_QUESTION_CODE}
      placeItems="center"
      gap={12}
      paddingInline={4}
      maxH={'full'}
      wordBreak={'break-word'}
      overflow={'auto'}
    >
      {mapQuestionGroup((ask, question) => {
        return (
          <EvtButton
            key={ask?.attributeCode || ''}
            questionCode={mappedPcm.PRI_QUESTION_CODE}
            childCode={ask?.questionCode || ''}
            iconId={question?.icon || ''}
            vert={true}
          />
        )
      })(mappedPcm.PRI_QUESTION_CODE)}
    </Grid>
  )
}

export default TemplateSidebarOne
