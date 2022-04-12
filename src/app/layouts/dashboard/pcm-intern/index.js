import { HStack, Text, VStack } from '@chakra-ui/layout'
import { Flex, Progress, Spacer, Divider, Image } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { toUpper, find, includes } from 'ramda'

import { selectAttributes } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'
import Recommendations from 'app/layouts/dashboard/intern/recommendations'

const Intern = ({ userCode, dashboardSbes }) => {
  const profileCompletedPercentage = 30
  const [firstnameInfo, associatedAgentInfo] = useSelector(
    selectAttributes(userCode, ['PRI_FIRSTNAME', 'PRI_AGENT_NAME', 'PRI_STATUS']),
  )

  const firstName = toUpper(firstnameInfo?.value) || ''
  const associatedAgent = associatedAgentInfo.value

  const internSbe = find(includes('SBE_INTERNS_'), dashboardSbes || [])

  const sendEventMessage = ({ actionCode, parentCode }) =>
    onSendMessage({
      // rootcode: userCode,
      targetCode: userCode,
      code: actionCode,
      parentCode,
    })

  return (
    <VStack alignItems="flex-start" spacing="10">
      <VStack marginLeft="72px" spacing="5" alignItems="flex-start" w="790px">
        <Text fontFamily="Roboto" fontWeight="700" fontSize="36px" color="#234371">
          {`WELCOME ${firstName}`}
        </Text>

        <VStack w="inherit">
          <Progress
            value={profileCompletedPercentage}
            w="inherit"
            h="13px"
            borderRadius="13px"
            colorScheme="teal"
          />
          <HStack w="inherit">
            <Text
              fontFamily="Roboto"
              fontWeight="500"
              fontSize="10px"
              color="#00AFAC"
              cursor="pointer"
              onClick={() =>
                sendEventMessage({
                  actionCode: 'QUE_AVATAR_PROFILE_GRP',
                  parentCode: 'QUE_AVATAR_GRP',
                })
              }
            >{`EDIT YOUR PROFILE`}</Text>
            <Spacer />
            <Text
              fontFamily="Roboto"
              fontWeight="500"
              fontSize="10px"
              color="#00AFAC"
              cursor="pointer"
              onClick={() =>
                sendEventMessage({ actionCode: 'ACT_PRI_EVENT_VIEW', parentCode: internSbe })
              }
            >{`PREVIEW YOUR PROFILE`}</Text>
          </HStack>
        </VStack>

        <Flex border="1px solid #808080" borderRadius="15px" w="inherit" h="80px">
          <VStack flexGrow="1" justifyContent="center" spacing="0">
            <Text fontFamily="Roboto" fontWeight="400" fontSize="24px" color="#00AFAB">{`35`}</Text>
            <Text
              fontFamily="Roboto"
              fontWeight="400"
              fontSize="16px"
            >{`Internships suitable for you`}</Text>
          </VStack>
          <Divider orientation="vertical" />
          <VStack flexGrow="1" justifyContent="center" spacing="0">
            <Text fontFamily="Roboto" fontWeight="400" fontSize="24px" color="#00AFAB">{`0`}</Text>
            <Text
              fontFamily="Roboto"
              fontWeight="400"
              fontSize="16px"
            >{`Pending Applications`}</Text>
          </VStack>
          <Divider orientation="vertical" />
          <VStack flexGrow="1" justifyContent="center" spacing="0">
            <Text fontFamily="Roboto" fontWeight="400" fontSize="24px" color="#00AFAB">{`0`}</Text>
            <Text fontFamily="Roboto" fontWeight="400" fontSize="16px">{`Pending Interview`}</Text>
          </VStack>
        </Flex>

        <HStack>
          <Image
            borderRadius="full"
            boxSize="46px"
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
          />
          <Text
            fontFamily="Roboto"
            fontWeight="400"
            fontSize="16px"
          >{`Your Matchmaker is ${associatedAgent}`}</Text>
        </HStack>
      </VStack>

      <Divider w="calc(100% - 150px)" alignSelf="center" borderColor="#808080" />

      <Recommendations />
    </VStack>
  )
}

export default Intern
