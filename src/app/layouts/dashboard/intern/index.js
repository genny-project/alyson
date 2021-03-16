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

const Intern = ({ userCode }) => {
  const [name] = useSelector(selectAttributes(userCode, ['PRI_NAME']))
  const dashboardSbes = useSelector(selectDashboard)

  const apps = find(includes('_MY_APPLICATIONS_'))(dashboardSbes)
  const interviews = find(includes('_INTERVIEWS_'))(dashboardSbes)

  const totalApps = useSelector(selectCode(apps, 'PRI_TOTAL_RESULTS'))
  const totalInterviews = useSelector(selectCode(interviews, 'PRI_TOTAL_RESULTS'))

  return (
    <Center>
      <Box
        bg="linear-gradient(169deg, rgba(86,31,205,1) 0%, rgba(34,110,195,1) 12%, rgba(42,209,236,1) 54%, rgba(255,255,255,0) 66%)"
        style={{ top: 0, bottom: 0, left: 0, right: 0, zIndex: -1 }}
        position="fixed"
      />
      <VStack spacing="6">
        <Text color="white" fontSize="3xl" fontWeight="medium">
          {`Welcome ${name?.value}`}
        </Text>
        <Button
          onClick={() =>
            onSendMessage({
              code: 'QUE_TREE_ITEM_INTERNSHIPS',
              parentCode: 'QUE_TREE_ITEM_INTERNSHIPS',
            })
          }
          colorScheme="secondary"
          leftIcon={<FontAwesomeIcon icon={faSearch} />}
          rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
          size="lg"
          boxShadow="lg"
        >
          Start Searching
        </Button>
        <HStack>
          {totalInterviews?.value ? (
            <Box h="10rem" borderRadius="lg" p="10" boxShadow="lg">
              <VStack>
                <Text
                  color="white"
                  fontSize="xl"
                >{`Don't forget about these ${totalInterviews.value} interviews coming up!`}</Text>
                <Button leftIcon={<FontAwesomeIcon icon={faCalendar} />} colorScheme="primary">
                  Track them
                </Button>
              </VStack>
            </Box>
          ) : null}
          <Box h="10rem" borderRadius="lg" p="10" boxShadow="lg">
            {totalApps?.value ? (
              <VStack>
                <Text
                  color="white"
                  fontSize="xl"
                >{`You have ${totalApps.value} pending applications`}</Text>
                <Text color="white">{`We'll let you know about any progress`}</Text>
              </VStack>
            ) : (
              <VStack>
                <Text color="white" fontSize="xl">{`You don't have any applications yet! `}</Text>
                <Button leftIcon={<FontAwesomeIcon icon={faAngellist} />} colorScheme="primary">
                  Start applying!
                </Button>
              </VStack>
            )}
          </Box>
        </HStack>
        <Recommendations />
      </VStack>
    </Center>
  )
}

export default Intern
