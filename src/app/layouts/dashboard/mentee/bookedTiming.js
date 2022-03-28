import { Box, Grid } from '@chakra-ui/react'

import Attribute from '../../../BE/attribute/index'
import DetailCards from 'app/layouts/components/detail_card'
import { mentorInfo } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { useMobileValue } from 'utils/hooks'

const BookedTiming = ({ mentorCode }) => {
  const templateColumns = useMobileValue(['1fr', '70px 1fr 100px'])
  console.log(mentorCode)

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
        <Attribute code={mentorCode} attribute="_LNK_MENTOR__PRI_USER_PROFILE_PICTURE" />
      </Box>

      <DetailCards detailsection={mentorInfo} currentMentor={mentorCode} miniCard shadow={'none'} />

      <Box>
        <Attribute code={mentorCode} attribute={'PRI_MEET_AND_GREET_TIME'} />
      </Box>
    </Grid>
  )
}
export default BookedTiming
