import { Box, Grid } from '@chakra-ui/react'

import Attribute from '../../../BE/attribute/index'
import DetailCards from 'app/layouts/components/detail_card'
import { mentorInfo } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { useMobileValue } from 'utils/hooks'

const ProvidedTimings = ({ menteeStatus, currentMentor }) => {
  const templateColumns = useMobileValue(['1fr', '70px 1fr 100px'])

  return (
    <Grid
      templateColumns={templateColumns}
      alignContent={'start'}
      gap={'1rem'}
      bg={'white'}
      spacing={4}
      p="3"
    >
      <Box>
        <Attribute code={currentMentor} attribute="_LNK_MENTOR__PRI_USER_PROFILE_PICTURE" />
      </Box>

      <DetailCards
        detailsection={mentorInfo}
        currentMentor={currentMentor}
        miniCard
        shadow={'none'}
      />

      <Box>
        {menteeStatus === 'PENDING_SELECT_DATE' ? (
          <>
            <Attribute code={currentMentor} attribute={'PRI_PRIMARY_AVAILABILITY'} />
            <Attribute code={currentMentor} attribute={'PRI_SECONDARY_AVAILABILITY'} />
            <Attribute code={currentMentor} attribute={'PRI_TERTIARY_AVAILABILITY'} />
          </>
        ) : (
          <Attribute code={currentMentor} attribute={'PRI_MEET_AND_GREET_TIME'} />
        )}
      </Box>
    </Grid>
  )
}
export default ProvidedTimings
