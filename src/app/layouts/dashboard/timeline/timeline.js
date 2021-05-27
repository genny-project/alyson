import { Button, HStack, VStack, Box, Text, Flex } from '@chakra-ui/react'
import { map } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Card from 'app/layouts/components/card'
import { onSendMessage } from 'vertx'

const description =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse venenatis placerat arcu, tempor rutrum tortor porta quis. Donec aliquam urna ac varius ultrices. Morbi vel dapibus nunc, dictum pretium justo. Nulla non blandit leo. Proin non imperdiet ex. Etiam cursus dignissim sem, nec interdum massa pellentesque eu. Proin condimentum mauris at diam porttitor, a rhoncus nisi semper. Sed sed tincidunt felis, at bibendum sapien. Etiam odio libero, pretium ac condimentum ac, congue ac mi. Aenean efficitur malesuada arcu mattis tempus.'

const Timeline = props => {
  const { menteeProps } = props
  const { trainingStatus } = menteeProps
  const items = [
    {
      title: 'Complete Profile',
      description: 'Please complete your profile before you can proceed!',
      buttonText: 'Go to Profile',
      completed: 'COMPLETE',
      code: 'QUE_AVATAR_PROFILE_GRP',
      parentCode: 'QUE_AVATAR_GRP',
    },
    {
      title: 'Complete Training',
      description: 'Access different training modules under this section.',
      buttonText: 'Go to Training',
      completed: trainingStatus,
      code: 'ACT_PRI_EVENT_START_MENTEE_TRAINING',
    },
    {
      title: 'Select Mentor',
      description: 'Choose the Mentor that suits you the most!',
      buttonText: 'Go to Mentor Selection',
      completed: false,
      isDisabled: trainingStatus === 'COMPLETE' ? false : true,
      code: 'ACT_PRI_EVENT_SELECT_MENTOR',
    },
    {
      title: 'First Meeting',
      description: description,
      buttonText: 'Select First Meeting',
      completed: false,
    },
    {
      title: 'Meet and Greet',
      description: 'Meet and Greet witht the mentors',
      buttonText: 'Meet & Greet',
      completed: false,
    },
  ]

  let totalItems = items.length
  let numberOfCompletedItems = items.filter(item => item.completed === 'COMPLETE').length
  let progressBarHeight = (numberOfCompletedItems / totalItems) * 100
  let timelineHeight = totalItems * 22.5

  return (
    <HStack h={`${timelineHeight}vh`} w="50%" position="relative" spacing={8}>
      <Box h="100%" w="1" background="silver">
        <Flex
          direction="column"
          h="100%"
          justifyContent="space-around"
          display="flex"
          position="absolute"
          ml="-3.5"
        >
          {map(({ title, completed }) => (
            <Box
              h="8"
              w="8"
              background={completed === 'COMPLETE' ? 'green' : 'silver'}
              borderRadius="50%"
              textAlign="center"
              key={title}
            >
              <Box h="100%" marginTop="1">
                {completed === 'COMPLETE' ? (
                  <FontAwesomeIcon opacity="0.5" icon={faCheck} color="#fff" />
                ) : null}
              </Box>
            </Box>
          ))(items)}
        </Flex>
        <Box h={`${progressBarHeight}%`} w="100%" background="green" />
      </Box>
      <VStack h="100%" justifyContent="space-around" display="flex" position="absolute">
        {map(({ title, description, buttonText, code, parentCode, isDisabled }) => (
          <Card key={title}>
            <VStack spacing={4} w={['xs', 'md']}>
              <Text textStyle="head.2" alignSelf="flex-start">
                {title}
              </Text>
              <Text textStyle="body.2" noOfLines={[1, 2, 3]} w="inherit">
                {description}
              </Text>
              <Button
                colorScheme="blue"
                onClick={() =>
                  onSendMessage({
                    code: code,
                    parentCode: parentCode ? parentCode : code,
                  })
                }
                size="md"
                alignSelf="flex-end"
                isDisabled={isDisabled}
              >
                {buttonText}
              </Button>
            </VStack>
          </Card>
        ))(items)}
      </VStack>
    </HStack>
  )
}

export default Timeline
