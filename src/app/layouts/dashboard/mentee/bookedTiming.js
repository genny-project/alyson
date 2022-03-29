import { Box, Flex, Grid } from '@chakra-ui/react'

import Attribute from '../../../BE/attribute/index'
import DetailCards from 'app/layouts/components/detail_card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { mentorInfo } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { useMobileValue } from 'utils/hooks'

const BookedTiming = ({ mentorCode }) => {
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
        <Attribute code={mentorCode} attribute="_LNK_MENTOR__PRI_USER_PROFILE_PICTURE" />
      </Box>

      <DetailCards detailsection={mentorInfo} currentMentor={mentorCode} miniCard shadow={'none'} />

      <Box
        paddingBlock={2}
        paddingInline={3}
        bg={'orange.100'}
        border={'1px'}
        borderRadius={'0.5rem'}
        borderColor={'orange.400'}
      >
        <Flex>
          <FontAwesomeIcon color={'#fc825c'} icon={faCalendarDay} />
          <Attribute
            config={{ ml: '0.5rem' }}
            code={mentorCode}
            attribute={'PRI_MEET_AND_GREET_TIME'}
          />
        </Flex>
      </Box>
    </Grid>
  )
}
export default BookedTiming
