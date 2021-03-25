import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import { useSelector } from 'react-redux'
import { includes, find } from 'ramda'
import { Button } from '@chakra-ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faCalendar, faSearch } from '@fortawesome/free-solid-svg-icons'
import { faAngellist } from '@fortawesome/free-brands-svg-icons'
import { onSendMessage } from 'vertx'
import Recommendations from './recommendations'
import Process from 'app/layouts/process'

const Intern = ({ userCode }) => {
  const [name] = useSelector(selectAttributes(userCode, ['PRI_NAME']))
  const dashboardSbes = useSelector(selectDashboard)

  const apps = find(includes('_MY_APPLICATIONS_'))(dashboardSbes)
  const interviews = find(includes('_INTERVIEWS_'))(dashboardSbes)

  const totalApps = useSelector(selectCode(apps, 'PRI_TOTAL_RESULTS'))
  const totalInterviews = useSelector(selectCode(interviews, 'PRI_TOTAL_RESULTS'))

  return (
    <Center>
      <VStack spacing="6">
        <Text fontSize="3xl" fontWeight="medium">
          {`Welcome ${name?.value}`}
        </Text>
        <Button
          onClick={() =>
            onSendMessage({
              code: 'QUE_TREE_ITEM_INTERNSHIPS',
              parentCode: 'QUE_TREE_ITEM_INTERNSHIPS',
            })
          }
          colorScheme="gradient"
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          size="lg"
          boxShadow="lg"
        >
          Start Searching
        </Button>
        <HStack>
          {totalInterviews?.value ? (
            <Box h="10rem" borderRadius="lg" p="10" boxShadow="dark-lg">
              <VStack>
                <Text fontSize="xl">{`Don't forget about these ${totalInterviews.value} interviews coming up!`}</Text>
                <Button leftIcon={<FontAwesomeIcon icon={faCalendar} />} colorScheme="primary">
                  Track them
                </Button>
              </VStack>
            </Box>
          ) : null}
          <Box h="10rem" borderRadius="lg" p="10" boxShadow="dark-lg">
            {totalApps?.value ? (
              <VStack>
                <Text fontSize="xl">{`You have ${totalApps.value} pending applications`}</Text>
                <Text>{`We'll let you know about any progress`}</Text>
              </VStack>
            ) : (
              <VStack>
                <Text fontSize="xl">{`You don't have any applications yet! `}</Text>
                <Button leftIcon={<FontAwesomeIcon icon={faAngellist} />} colorScheme="primary">
                  Start applying!
                </Button>
              </VStack>
            )}
          </Box>
        </HStack>
        <Recommendations />
        <Process dashboard />
      </VStack>
    </Center>
  )
}

export default Intern
