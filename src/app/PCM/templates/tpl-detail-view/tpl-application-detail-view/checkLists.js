import { Box, Grid } from '@chakra-ui/react'
import {
  adminConfirmedQuestionCode,
  matchesEmpContractQuestionCode,
  matchesVisaQuestionCode,
  websiteInvestigatedQuestionCode,
} from 'utils/constants'

import Ask from 'app/ASKS/ask'

const CheckLists = ({ code: passedQuestionCode, isStudent }) => {
  const CheckListItem = ({ parentCode, questionCode }) => {
    return <Ask parentCode={parentCode} questionCode={questionCode} />
  }

  return (
    <Box>
      <Grid gap="1rem">
        <CheckListItem parentCode={passedQuestionCode} questionCode={matchesVisaQuestionCode} />
        {!isStudent && (
          <CheckListItem
            parentCode={passedQuestionCode}
            questionCode={matchesEmpContractQuestionCode}
          />
        )}
        {!isStudent && (
          <CheckListItem
            parentCode={passedQuestionCode}
            questionCode={websiteInvestigatedQuestionCode}
          />
        )}
        <CheckListItem parentCode={passedQuestionCode} questionCode={adminConfirmedQuestionCode} />
      </Grid>
    </Box>
  )
}

export default CheckLists
