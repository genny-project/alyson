import {
  Box,
  Button,
  Grid,
  HStack,
  Spacer,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { find, includes, map } from 'ramda'
import { useIsMobile, useMobileValue } from 'utils/hooks'

import Attribute from 'app/BE/attribute'
import { inviteeDetails } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { selectDashboard } from 'redux/app/selectors'
import { selectRows } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const Invites = ({ setShowDetailView, setCurrentMentee }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const cardsbg = useColorModeValue('#ffffff', 'gray.800')
  const hoverbg = useColorModeValue('teal.300', 'teal.500')

  const dashboardSbes = useSelector(selectDashboard)

  const allMenteeCode = dashboardSbes && find(includes('_MENTEE_MNG_INVITES'))(dashboardSbes)
  const allMentee = useSelector(selectRows(allMenteeCode))

  const parentTemplateColumns = useMobileValue([
    'repeat(auto-fit, minmax(100px, 1fr))',
    '100px 1fr',
  ])
  const childTemplateColumns = useMobileValue(['repeat(auto-fit, minmax(100px, 1fr))', '100px 1fr'])
  const maxW = useMobileValue(['', '75%'])

  const isMobile = useIsMobile()

  return (
    <Box w="50vw" h="80vh" spacing={10} textAlign="center" p="5" position="sticky" top="10vh">
      <Text textStyle="head.2" bg={bg} py={5}>
        {`Please select any invitation from Mentees below!`}
      </Text>
      <Spacer />
      <Grid gap={10} bg={bg} overflowY="scroll" h="70vh" mt={5} p={5}>
        {allMentee &&
          map(mentee => (
            <Grid
              key={mentee}
              bg={cardsbg}
              _hover={{ boxShadow: 'dark-lg', rounded: 'md', color: 'white', bg: hoverbg }}
              cursor="pointer"
              w={'100%'}
              p="5"
              onClick={() => {
                setShowDetailView(true)
                setCurrentMentee(mentee)
              }}
              m="auto"
              boxShadow="base"
              rounded="md"
              textAlign="left"
              gap={'1rem'}
              templateColumns={parentTemplateColumns}
              maxW={maxW}
            >
              <VStack textAlign="center" spacing={5}>
                <Attribute
                  config={{ size: 'xl' }}
                  code={mentee}
                  attribute="_LNK_MENTEE__PRI_USER_PROFILE_PICTURE"
                />

                <Button w="full" colorScheme="primary" test-id={`VIEW_PROFILE_${mentee}`}>
                  {`View Profile`}
                </Button>
              </VStack>

              <VStack display="inline">
                <>
                  <HStack mb={'6'}>
                    <Attribute
                      config={{ textStyle: 'body.1' }}
                      code={mentee}
                      attribute="_LNK_MENTEE__PRI_FIRSTNAME"
                    />
                    <Attribute
                      config={{ textStyle: 'body.1' }}
                      code={mentee}
                      attribute="_LNK_MENTEE__PRI_LASTNAME"
                    />
                  </HStack>
                  {map(({ label, attribute }) => (
                    <Grid
                      key={`${label}-${attribute}`}
                      gap={isMobile ? '0' : '0.75rem'}
                      templateColumns={childTemplateColumns}
                    >
                      <Text textAlign={isMobile ? 'left' : 'right'} opacity={'0.75'}>
                        {label}
                      </Text>
                      <Attribute
                        config={{ textStyle: 'body.2' }}
                        code={mentee}
                        attribute={attribute}
                      />
                    </Grid>
                  ))(inviteeDetails)}
                </>
              </VStack>
            </Grid>
          ))(allMentee)}
      </Grid>
    </Box>
  )
}

export default Invites
