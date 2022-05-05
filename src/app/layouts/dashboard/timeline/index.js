import { Box, Button, Flex, HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import {
  accountVerificationPendingMsg,
  alreadyRegisteredMsg,
  complete,
  completePrevStepsMsg,
  dateSelctedMsg,
  meetAndGreetInProgressMsg,
  menteeInvitationPendingMsg,
  mentorAlreadySelectedMsg,
  mentorMatchedMsg,
  mentorSelectionMsg,
  trainingCompleteMsg,
} from 'utils/constants'
import { compose, divide, equals, filter, length, map, multiply, path } from 'ramda'

import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import { useMobileValue } from 'utils/hooks'

const Timeline = ({ items, setShowDetailView }) => {
  let totalItems = length(items)
  let numberOfCompletedItems = filter(item => equals(path(['completed'])(item), complete))(items)
  let lengthOfNumberOfCompletedItems = length(numberOfCompletedItems)
  let progressBarHeight = compose(multiply(100), divide)(lengthOfNumberOfCompletedItems, totalItems)

  let timelineHeight = multiply(totalItems, 25)

  const maxW = useMobileValue(['', '50vw'])

  return (
    <HStack w={'full'} h={`${timelineHeight}vh`} maxW={maxW} position="relative" spacing={8} mb={5}>
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
        {map(
          ({
            title,
            description,
            buttonText,
            code,
            parentCode,
            isDisabled,
            targetCode,
            status,
            completed,
            invitationStatus,
            mentorStatus,
            pendingDateSelected,
            trainingStatus,
          }) => (
            <Card key={title} p={4} px={5}>
              <VStack spacing={3} w="30vw" maxW={500}>
                <Text textStyle="head.2" alignSelf="flex-start">
                  {title}
                </Text>
                <Text textStyle="body.3" w="inherit" alignSelf="flex-start">
                  {description}
                </Text>
                <Tooltip
                  placement="right"
                  isDisabled={isDisabled ? false : true}
                  label={
                    equals(buttonText, 'Register')
                      ? alreadyRegisteredMsg
                      : equals(buttonText, 'Mentor Selected')
                      ? mentorAlreadySelectedMsg
                      : equals(buttonText, 'Go to Mentor Selection')
                      ? mentorSelectionMsg
                      : equals(mentorStatus, 'AVAILABLE')
                      ? menteeInvitationPendingMsg
                      : equals(completed, 'COMPLETE') && equals(trainingStatus, 'COMPLETE')
                      ? trainingCompleteMsg
                      : !pendingDateSelected && equals(completed, 'COMPLETE')
                      ? dateSelctedMsg
                      : equals(status, 'UNVERIFIED')
                      ? accountVerificationPendingMsg
                      : equals(status, 'MENTORING')
                      ? meetAndGreetInProgressMsg
                      : equals(invitationStatus, 'MATCHED')
                      ? mentorMatchedMsg
                      : completePrevStepsMsg
                  }
                  aria-label="Please complete the previous steps"
                  bg="red.400"
                  color="#ffffff"
                >
                  <Box alignSelf="flex-end">
                    {buttonText && (
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          onSendMessage({
                            code: code,
                            parentCode: parentCode,
                            targetCode: targetCode,
                          })
                          setShowDetailView(false)
                        }}
                        size="md"
                        isDisabled={isDisabled}
                        test-id={convertToUppercase(buttonText).replace(/ /g, '_')}
                      >
                        {buttonText}
                      </Button>
                    )}
                  </Box>
                </Tooltip>
              </VStack>
            </Card>
          ),
        )(items)}
      </VStack>
    </HStack>
  )
}

export default Timeline
