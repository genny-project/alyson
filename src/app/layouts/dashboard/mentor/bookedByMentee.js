import { Box, Grid } from '@chakra-ui/react'

import Attribute from '../../../BE/attribute/index'
import DetailCards from 'app/layouts/components/detail_card'
import { menteeInfo } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { useMobileValue } from 'utils/hooks'

const BookedByMentee = ({ menteeCode }) => {
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
        <Attribute code={menteeCode} attribute="_LNK_MENTEE__PRI_USER_PROFILE_PICTURE" />
      </Box>

      <DetailCards detailsection={menteeInfo} currentMentee={menteeCode} miniCard shadow={'none'} />

      <Box>
        <Attribute code={menteeCode} attribute={'PRI_MEET_AND_GREET_TIME'} />
      </Box>
    </Grid>
  )
}
export default BookedByMentee
