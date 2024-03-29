import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import { equals, find, includes } from 'ramda'
import { selectCode, selectRows } from 'redux/db/selectors'

import Attribute from '../../../BE/attribute/index'
import DetailCards from 'app/layouts/components/detail_card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons'
import { mentorInfo } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { onSendMessage } from 'vertx'
import { selectDashboard } from '../../../../redux/app/selectors'
import { useHistory } from 'react-router-dom'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

const ProvidedTimings = ({ labelCode = '' }) => {
  const templateColumns = useMobileValue(['1fr', '70px 1fr minmax(1px, max-content)'])
  const margin = useMobileValue(['', '10'])
  const history = useHistory()

  const dashboardSbes = useSelector(selectDashboard)
  const providedTimingSbes = dashboardSbes && find(includes('_APPLICATION_'))(dashboardSbes)

  const mentorTimings = useSelector(selectRows(providedTimingSbes))[0]

  const userCode = useSelector(selectCode('USER'))
  const linkedApp = useSelector(selectCode(userCode, 'LNK_APPLICATION'))
  const code = linkedApp?.value

  const onSelect = option => {
    onSendMessage({
      targetCode: code,
      sourceCode: userCode,
      code: `ACT_${option}`,
    })
    history.push('/home')
  }

  return (
    <Grid
      templateColumns={templateColumns}
      alignContent={'start'}
      alignItems={'start'}
      gap={'1rem'}
      bg={'white'}
      spacing={4}
      p="5"
      rounded={'md'}
      shadow={'base'}
    >
      <Box mt={margin}>
        <Attribute
          config={{ w: '70px', h: '70px' }}
          code={mentorTimings}
          attribute="_LNK_MENTOR__PRI_USER_PROFILE_PICTURE"
        />
      </Box>

      <DetailCards
        detailsection={mentorInfo}
        currentMentor={mentorTimings}
        miniCard
        shadow={'none'}
      />

      {equals('LAB_MENTEE_SELECT_MNG_DATETIME', labelCode) ? (
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
            code={code}
            attribute={'PRI_MEET_AND_GREET_TIME'}
          />
        </Box>
      ) : equals('LAB_MENTEE_MEETINGS_SCHEDULES', labelCode) ? (
        <></>
      ) : equals('LAB_INVITE_SENT', labelCode) ? (
        <Grid mt={margin} gap={'1rem'} alignItems={'start'} justifyContent={'start'}>
          <Box
            onClick={() => onSelect('PRI_PRIMARY_AVAILABILITY')}
            paddingBlock={2}
            paddingInline={3}
            bg={'orange.100'}
            border={'1px'}
            borderRadius={'0.5rem'}
            borderColor={'orange.400'}
            cursor={'pointer'}
            _hover={{
              bg: 'orange.400',
            }}
          >
            <Flex>
              <FontAwesomeIcon color={'#fc825c'} icon={faCalendarDay} />
              <Attribute
                config={{ minW: 'inherit', ml: '0.5rem' }}
                code={mentorTimings}
                attribute={'PRI_PRIMARY_AVAILABILITY'}
              />
            </Flex>
          </Box>
          <Box
            onClick={() => onSelect('PRI_SECONDARY_AVAILABILITY')}
            paddingBlock={2}
            paddingInline={3}
            bg={'orange.100'}
            border={'1px'}
            borderRadius={'0.5rem'}
            borderColor={'orange.400'}
            cursor={'pointer'}
            _hover={{
              bg: 'orange.400',
            }}
          >
            <Flex>
              <FontAwesomeIcon color={'#fc825c'} icon={faCalendarDay} />
              <Attribute
                config={{ minW: 'inherit', ml: '0.5rem' }}
                code={mentorTimings}
                attribute={'PRI_SECONDARY_AVAILABILITY'}
              />
            </Flex>
          </Box>
          <Box
            onClick={() => onSelect('PRI_TERTIARY_AVAILABILITY')}
            paddingBlock={2}
            paddingInline={3}
            bg={'orange.100'}
            border={'1px'}
            borderRadius={'0.5rem'}
            borderColor={'orange.400'}
            cursor={'pointer'}
            _hover={{
              bg: 'orange.400',
            }}
          >
            <Flex>
              <FontAwesomeIcon color={'#fc825c'} icon={faCalendarDay} />
              <Attribute
                config={{ minW: 'inherit', ml: '0.5rem' }}
                code={mentorTimings}
                attribute={'PRI_TERTIARY_AVAILABILITY'}
              />
            </Flex>
          </Box>
        </Grid>
      ) : (
        <></>
      )}
    </Grid>
  )
}
export default ProvidedTimings
