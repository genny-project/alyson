import { Button, HStack, VStack, Box, Text, Flex } from '@chakra-ui/react'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faVideo, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { map } from 'ramda'

const allMeetings = [
  {
    text: 'Wednesday 26th May 2021 at 12:15 PM',
    link: 'https://www.google.com',
    completed: true,
  },
  {
    text: 'Thursday 27th May 2021 at 12:00 PM',
    link: 'https://www.google.com',
    completed: true,
  },
  {
    text: 'Monday 30th May 2021 at 09:00 AM',
    link: 'https://www.google.com',
    completed: true,
  },
  {
    text: 'Sunday 26th May 2021 at 02:15 PM',
    link: 'https://www.google.com',
    completed: true,
  },
  {
    text: 'Monday 6th June 2021 at 01:15 PM',
    link: 'https://www.google.com',
    completed: true,
  },
  {
    text: 'Wednesday 17th June 2021 at 12:15 PM',
    link: 'https://www.google.com',
    completed: false,
  },
  {
    text: 'Wednesday 23rd June 2021 at 12:15 PM',
    link: 'https://catcafemelbourne.com/',
    completed: false,
  },
  {
    text: 'Thursday 24th June 2021 at 22:15 PM',
    link: 'https://www.google.com',
    completed: false,
  },
  {
    text: 'Friday 20th August 2021 at 23:15 PM',
    link: 'https://www.google.com',
    completed: false,
  },
  {
    text: 'Sunday 22nd August 2021 at 10:15 AM',
    link: 'https://www.google.com',
    completed: false,
  },
  {
    text: 'Tuesday 26th August 2021 at 11:15 AM',
    link: 'https://www.google.com',
    completed: false,
  },
  {
    text: 'Thursday 29th August 2021 at 12:15 PM',
    link: 'https://www.google.com',
    completed: false,
  },
]

const Meetings = () => {
  return (
    <Box h="inherit" minW="30%" ml={2}>
      <Card>
        <VStack spacing={7} paddingRight={10}>
          <Text alignSelf="flex-start" textStyle="head.2">{`Meeting List`}</Text>
          <VStack spacing={5} alignSelf="flex-start">
            {map(({ text, link, completed }) => (
              <HStack spacing={7} alignSelf="flex-start" w="100%" justifyContent="space-between">
                {completed ? (
                  <FontAwesomeIcon icon={faCheckCircle} color="green" />
                ) : (
                  <FontAwesomeIcon icon={faCalendar} color="darkGrey" />
                )}
                <Text w="80%" alignSelf="flex-start">
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
