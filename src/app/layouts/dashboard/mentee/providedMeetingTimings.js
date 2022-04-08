import { Box, Grid } from '@chakra-ui/react'

import Attribute from '../../../BE/attribute/index'
import DetailCards from 'app/layouts/components/detail_card'
import { mentorInfo } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { useMobileValue } from 'utils/hooks'

const ProvidedTimings = ({ menteeStatus, currentMentor }) => {
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
          code={currentMentor}
          attribute="_LNK_MENTOR__PRI_USER_PROFILE_PICTURE"
        />
      </Box>

      <DetailCards
        detailsection={mentorInfo}
        currentMentor={currentMentor}
        miniCard
        shadow={'none'}
      />

      <Grid mt={margin} gap={'1rem'} alignItems={'start'} justifyContent={'start'}>
        {menteeStatus === 'PENDING_SELECT_DATE' ? (
          <>
            <Box
              paddingBlock={2}
              paddingInline={3}
              bg={'orange.100'}
              border={'1px'}
              borderRadius={'0.5rem'}
              borderColor={'orange.400'}
              cursor={'pointer'}
            >
              <Attribute code={currentMentor} attribute={'PRI_PRIMARY_AVAILABILITY'} />
            </Box>
            <Box
              paddingBlock={2}
              paddingInline={3}
              bg={'orange.100'}
              border={'1px'}
              borderRadius={'0.5rem'}
              borderColor={'orange.400'}
              cursor={'pointer'}
            >
              <Attribute code={currentMentor} attribute={'PRI_SECONDARY_AVAILABILITY'} />
            </Box>
            <Box
              paddingBlock={2}
              paddingInline={3}
              bg={'orange.100'}
              border={'1px'}
              borderRadius={'0.5rem'}
              borderColor={'orange.400'}
              cursor={'pointer'}
            >
              <Attribute code={currentMentor} attribute={'PRI_TERTIARY_AVAILABILITY'} />
            </Box>
          </>
        ) : (
          <Box
            paddingBlock={2}
            paddingInline={3}
            bg={'orange.100'}
            border={'1px'}
            borderRadius={'0.5rem'}
            borderColor={'orange.400'}
            cursor={'pointer'}
          >
            <Attribute code={currentMentor} attribute={'PRI_MEET_AND_GREET_TIME'} />
          </Box>
        )}
      </Grid>
    </Grid>
  )
}
export default ProvidedTimings
