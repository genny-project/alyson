import { map } from 'ramda'
import { HStack, VStack, Box, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faVideo, faCalendar } from '@fortawesome/free-solid-svg-icons'

import Card from 'app/layouts/components/card'
import getMeetingsList from 'app/layouts/dashboard/timeline/helpers/get-meetings-list'

const Meetings = () => {
  const { allMeetings } = getMeetingsList()
  return (
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
