import { map } from 'ramda'
import { HStack, VStack, Box, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faVideo, faCalendar } from '@fortawesome/free-solid-svg-icons'

import Card from 'app/layouts/components/card'
import getMeetingsList from 'app/layouts/dashboard/mentee/helpers/get-meetings-list'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const Meetings = () => {
  const userCode = useSelector(selectCode('USER'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))?.value

  const { allMeetings, hasUndefinedMeetings } = getMeetingsList()

  return hasUndefinedMeetings ? (
    <Box h="inherit" w="40%" ml={2}>
      <Card position="sticky" top="10vh">
        <VStack spacing={5}>
          <Text textStyle="head.1">{`Hello ${name}`}</Text>
          <Text textStyle="head.2">{`Sit tight, look out for an email from you mentor with three suggested time to meet to know one another.`}</Text>
          <Text textStyle="head.2">{`Should this meeting go well and you both agree to work with each other, we will be asking you to select a time to meet each fortnight for next six months.`}</Text>
        </VStack>
      </Card>
    </Box>
  ) : (
    <Box h="inherit" minW="30%" ml={2}>
      <Card position="sticky" top="10vh">
        <VStack spacing={7} paddingRight={10}>
          <Text alignSelf="flex-start" textStyle="head.2">{`Meeting List`}</Text>
          <VStack spacing={5} alignSelf="flex-start">
            {map(({ text, link, completed }) => (
              <HStack
                spacing={7}
                alignSelf="flex-start"
                w="100%"
                justifyContent="space-between"
                key={text}
              >
                {completed ? (
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                ) : (
                  <FontAwesomeIcon icon={faCalendar} color="darkGrey" />
                )}
                <Text w="80%" minW="10vw" alignSelf="flex-start">
                  {text}
                </Text>
                <a target="_blank" rel="noopener noreferrer" href={link}>
                  <FontAwesomeIcon icon={faVideo} color="darkGrey" />
                </a>
              </HStack>
            ))(allMeetings)}
          </VStack>
        </VStack>
      </Card>
    </Box>
  )
}

export default Meetings
