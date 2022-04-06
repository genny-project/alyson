import { Box, Grid, Text } from '@chakra-ui/react'

import Attribute from '../../../BE/attribute/index'
import DetailCards from 'app/layouts/components/detail_card'
import { menteeInfo } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { useMobileValue } from 'utils/hooks'

const BookedByMentee = ({ menteeCode }) => {
  const templateColumns = useMobileValue(['1fr', '70px 1fr minmax(10rem, max-content)'])
  const margin = useMobileValue(['', '10'])

  return (
    <Grid
      templateColumns={templateColumns}
      alignContent={'start'}
      alignItems={'start'}
      gap={'1rem'}
      bg={'white'}
      spacing={4}
      p="5"
      position={'sticky'}
      top={'5vh'}
    >
      <Box mt={margin}>
        <Attribute
          config={{ w: '70px', h: '70px' }}
          code={menteeCode}
          attribute="_LNK_MENTEE__PRI_USER_PROFILE_PICTURE"
        />
      </Box>

      <DetailCards
        detailsection={menteeInfo}
        currentMentee={menteeCode}
        miniCard
        shadow={'none'}
        config={{ p: 0 }}
      />

      <Box
        mt={margin}
        paddingBlock={2}
        paddingInline={3}
        bg={'orange.600'}
        borderRadius={'0.5rem'}
        cursor={'pointer'}
        justifySelf={'start'}
        color={'text.dark'}
        textAlign={'center'}
      >
        <Text>{'Meet & Greet Booked'}</Text>

        <Attribute
          config={{ minW: 'inherit', ml: '0.5rem' }}
          code={menteeCode}
          attribute={'PRI_MEET_AND_GREET_TIME'}
        />
      </Box>
    </Grid>
  )
}
export default BookedByMentee
