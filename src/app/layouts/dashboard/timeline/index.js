import { Box, Button, Flex, HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { compose, divide, equals, filter, length, map, multiply, path } from 'ramda'

import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { complete } from 'utils/constants'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'

const Timeline = ({ items }) => {
  let totalItems = length(items)
  let numberOfCompletedItems = filter(item => equals(path(['completed'])(item), complete))(items)
  let lengthOfNumberOfCompletedItems = length(numberOfCompletedItems)
  let progressBarHeight = compose(multiply(100), divide)(lengthOfNumberOfCompletedItems, totalItems)

  let timelineHeight = multiply(totalItems, 25)

  return (
    <HStack h={`${timelineHeight}vh`} w="50vw" position="relative" spacing={8} mb={5}>
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
              background={equals(completed, complete) ? 'green' : 'silver'}
              borderRadius="50%"
              textAlign="center"
              key={title}
            >
              <Box h="100%" marginTop="1">
                {equals(completed, complete) ? (
                  <FontAwesomeIcon icon={faCheck} color="#fff" />
                ) : null}
              </Box>
            </Box>
          ))(items)}
        </Flex>
        <Box h={`${progressBarHeight}%`} w="100%" background="green" />
      </Box>
      <VStack h="100%" justifyContent="space-around" display="flex" position="absolute">
        {map(({ title, description, buttonText, code, parentCode, isDisabled, targetCode }) => (
          <Card key={title} p={4} px={5}>
            <VStack spacing={3} w="30vw" maxW={500}>
              <Text textStyle="head.2" alignSelf="flex-start">
                {title}
              </Text>
              <Text textStyle="body.3" noOfLines={[1]} w="inherit" alignSelf="flex-start">
                {description}
              </Text>
              <Tooltip
                placement="right"
                isDisabled={isDisabled ? false : true}
                label={
                  equals(buttonText, 'Register')
                    ? 'You have already registered!'
                    : equals(buttonText, 'Mentor Selected')
                    ? 'You have already selected a Mentor!'
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
                          targetCode: targetCode,
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
