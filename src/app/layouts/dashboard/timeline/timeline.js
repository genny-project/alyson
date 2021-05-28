import { Button, HStack, VStack, Box, Text, Flex, Tooltip } from '@chakra-ui/react'
import { map } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

import Card from 'app/layouts/components/card'
import { onSendMessage } from 'vertx'
import getMenteeTimelineItems from 'app/layouts/dashboard/timeline/helpers/get-timeline-items'

const Timeline = () => {
  const { items } = getMenteeTimelineItems()

  let totalItems = items.length
  let numberOfCompletedItems = items.filter(item => item.completed === 'COMPLETE').length
  let progressBarHeight = (numberOfCompletedItems / totalItems) * 100
  let timelineHeight = totalItems * 20

  return (
    <HStack h={`${timelineHeight}vh`} w="50%" position="relative" spacing={8} mb={5}>
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
                {completed === 'COMPLETE' ? <FontAwesomeIcon icon={faCheck} color="#fff" /> : null}
              </Box>
            </Box>
          ))(items)}
        </Flex>
        <Box h={`${progressBarHeight}%`} w="100%" background="green" />
      </Box>
      <VStack h="100%" justifyContent="space-around" display="flex" position="absolute">
        {map(({ title, description, buttonText, code, parentCode, isDisabled }) => (
          <Card key={title}>
            <VStack spacing={3} w={['xs', 'md']}>
              <Text textStyle="head.2" alignSelf="flex-start">
                {title}
              </Text>
              <Text textStyle="body.3" noOfLines={[1]} w="inherit">
                {description}
              </Text>
              <Tooltip
                placement="right"
                isDisabled={isDisabled ? false : true}
                label={
                  buttonText === 'Register'
                    ? 'You have already registered!'
                    : 'Please complete the previous steps'
                }
                aria-label="Please complete the previous steps"
                bg="red.400"
                color="#ffffff"
              >
                <Box alignSelf="flex-end">
                  {buttonText && (
                    <Button
                      colorScheme="blue"
                      onClick={() =>
                        onSendMessage({
                          code: code,
                          parentCode: parentCode,
                        })
                      }
                      size="md"
                      isDisabled={isDisabled}
                    >
                      {buttonText}
                    </Button>
                  )}
                </Box>
              </Tooltip>
            </VStack>
          </Card>
        ))(items)}
      </VStack>
    </HStack>
  )
}

export default Timeline
