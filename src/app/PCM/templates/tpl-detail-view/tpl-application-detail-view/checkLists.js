import { Box, Grid } from '@chakra-ui/react'
import {
  adminConfirmedQuestionCode,
  matchesEmpContractQuestionCode,
  matchesVisaQuestionCode,
  websiteInvestigatedQuestionCode,
} from 'utils/constants'

import Ask from 'app/ASKS/ask'
import { mapObject } from 'utils/helpers/map-object'
import { compose } from 'ramda'
import { rejectUndefined } from 'utils/helpers/reject-undefined'

const CheckLists = ({ code: passedQuestionCode, isStudent }) => {
  const CheckListItem = ({ parentCode, questionCode }) => {
    return <Ask overrideComponent={'approve'} parentCode={parentCode} questionCode={questionCode} />
  }

  /// Would be better to have the capabilities or backend handle this in the future, however
  /// currently all asks are sent
  const checklistItemsDisplayForStudent = {
    [matchesVisaQuestionCode]: true,
    [matchesEmpContractQuestionCode]: false,
    [websiteInvestigatedQuestionCode]: false,
    [adminConfirmedQuestionCode]: true,
  }

  const mapItems = compose(
    rejectUndefined,
    mapObject((questionCode, forStudent) => {
      if (forStudent || !isStudent) {
        return (
          <CheckListItem
            key={`CHECKLIST-ITEM-${questionCode}`}
            parentCode={passedQuestionCode}
            questionCode={questionCode}
          />
        )
      } else {
        return undefined
      }
    }),
  )

  return (
    <Box>
      <Grid>{mapItems(checklistItemsDisplayForStudent)}</Grid>
    </Box>
  )
}

export default CheckLists
