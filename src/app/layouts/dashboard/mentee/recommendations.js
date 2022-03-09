import { Box, Button, Grid, Spacer, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import { find, includes, map } from 'ramda'

import Attribute from 'app/BE/attribute'
import { recommendationDetails } from 'app/layouts/dashboard/timeline/templates/CardContent'
import { selectDashboard } from 'redux/app/selectors'
import { selectRows } from 'redux/db/selectors'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

const Recommendation = ({ setShowDetailView, setCurrentMentor }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const cardsbg = useColorModeValue('#ffffff', 'gray.800')
  const hoverbg = useColorModeValue('teal.300', 'teal.500')

  const dashboardSbes = useSelector(selectDashboard)
  const allMentorsCode = dashboardSbes && find(includes('_SUMMARY_MENTORS_'))(dashboardSbes)
  const allMentors = useSelector(selectRows(allMentorsCode))

  const parentTemplateColumns = useMobileValue([
    'repeat(auto-fit, minmax(100px, 1fr))',
    '100px 1fr',
  ])
  const childTemplateColumns = useMobileValue(['repeat(auto-fit, minmax(100px, 1fr))', '100px 1fr'])
  const maxW = useMobileValue(['', '75%'])

  return (
    <Box w="50vw" h="80vh" spacing={10} textAlign="center" p="5" position="sticky" top="10vh">
      <Text
        textStyle="head.2"
        bg={bg}
        py={5}
      >{`Please select a Mentor from the suggestions below!`}</Text>
      <Spacer />
      <Grid gap={10} bg={bg} overflowY="scroll" h="70vh" mt={5} p={5}>
        {allMentors &&
          map(mentor => (
            <Grid
              key={mentor}
              bg={cardsbg}
              _hover={{ boxShadow: 'dark-lg', rounded: 'md', color: 'white', bg: hoverbg }}
              cursor="pointer"
              w={'100%'}
              p="5"
              onClick={() => {
                setShowDetailView(true)
                setCurrentMentor(mentor)
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
                  code={mentor}
                  attribute="PRI_USER_PROFILE_PICTURE"
                />
                <Attribute config={{ textStyle: 'body.2' }} code={mentor} attribute="PRI_NAME" />
                <Button
                  w="full"
                  colorScheme="primary"
                  test-id={`VIEW_PROFILE_${mentor}`}
                >{`View Profile`}</Button>
              </VStack>

              <VStack display="inline">
                {map(({ label, attribute }) => (
                  <Grid key={`${label}-${attribute}`} templateColumns={childTemplateColumns}>
                    <Text>{label}</Text>
                    <Attribute
                      config={{ textStyle: 'body.2' }}
                      code={mentor}
                      attribute={attribute}
                    />
                  </Grid>
                ))(recommendationDetails)}
              </VStack>
            </Grid>
          ))(allMentors)}
      </Grid>
    </Box>
  )
}

export default Recommendation
