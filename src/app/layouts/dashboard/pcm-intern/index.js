import { Box, HStack, Text, VStack, Stack } from '@chakra-ui/layout'
import { Flex, Progress, Spacer, Divider, Image } from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faSearch } from '@fortawesome/free-solid-svg-icons'
import { find, includes, toUpper } from 'ramda'

import { selectAttributes } from 'redux/db/selectors'
import { selectDashboard } from 'redux/app/selectors'
import { callBucketView, onSendMessage } from 'vertx'
import Recommendations from 'app/layouts/dashboard/intern/recommendations'
import Attribute from 'app/BE/attribute'
import { useEffect } from 'react'
import Card from 'app/layouts/components/card'

const Intern = ({ userCode }) => {
  const profileCompletedPercentage = 30
  const [firstnameInfo, associatedAgentInfo, status] = useSelector(
    selectAttributes(userCode, ['PRI_FIRSTNAME', 'PRI_AGENT_NAME', 'PRI_STATUS']),
  )

  const firstName = toUpper(firstnameInfo?.value) || ''
  const associatedAgent = associatedAgentInfo.value

  const sendEventMessage = actionCode =>
    onSendMessage({
      parentCode: userCode,
      targetCode: userCode,
      code: actionCode,
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
              onClick={() => sendEventMessage('ACT_PRI_EVENT_EDIT')}
            >{`EDIT YOUR PROFILE`}</Text>
            <Spacer />
            <Text
              fontFamily="Roboto"
              fontWeight="500"
              fontSize="10px"
              color="#00AFAC"
              cursor="pointer"
              onClick={() => sendEventMessage('ACT_PRI_EVENT_VIEW')}
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
    </VStack>
  )

  //   const dashboardSbes = useSelector(selectDashboard)

  //   const internSbe = find(includes('_INTERN_'), dashboardSbes || [])

  //   useEffect(() => {
  //     callBucketView()
  //   }, [])

  //   return (
  //     <VStack>
  //       <Stack maxW="90vw" direction={['column', 'row']} align="stretch">
  //         <Card>
  //           <HStack spacing="5">
  //             <Box
  //               onClick={() =>
  //                 onSendMessage({
  //                   code: 'QUE_AVATAR_PROFILE_GRP',
  //                   parentCode: 'QUE_AVATAR_GRP',
  //                   rootCode: userCode,
  //                   targetCode: userCode,
  //                 })
  //               }
  //             >
  //               <Attribute code={userCode} attribute="PRI_IMAGE_URL" config={{ size: '2xl' }} />
  //             </Box>
  //             <VStack align="start">
  //               <Text textStyle="tail.3">{`Welcome back,`}</Text>
  //               <Text textStyle="head.1">{name?.value}</Text>
  //               <Text textStyle="body.3" maxW="20rem">
  //                 {occ?.value}
  //               </Text>
  //             </VStack>
  //           </HStack>
  //         </Card>
  //         <Card>
  //           <VStack align="stretch" height="100%">
  //             <Text textStyle="body.1">{`Actions`}</Text>
  //             <VStack align="stretch" height="inherit" justifyContent="space-evenly">
  //               <Button
  //                 hidden={status?.value === 'PROGRESS'}
  //                 onClick={() =>
  //                   onSendMessage({
  //                     code: 'QUE_TREE_ITEM_INTERNSHIPS',
  //                     parentCode: 'QUE_TREE_ITEM_INTERNSHIPS',
  //                   })
  //                 }
  //                 colorScheme="primary"
  //                 leftIcon={<FontAwesomeIcon icon={faSearch} />}
  //                 rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
  //               >
  //                 {`Find an Internship`}
  //               </Button>
  //               <Button
  //                 onClick={() =>
  //                   onSendMessage({
  //                     code: 'ACT_PRI_EVENT_EDIT',
  //                     parentCode: internSbe,
  //                     targetCode: userCode,
  //                   })
  //                 }
  //                 colorScheme="primary"
  //                 variant="outline"
  //               >
  //                 {`Edit Your Profile`}
  //               </Button>
  //             </VStack>
  //           </VStack>
  //         </Card>
  //       </Stack>
  //       <Progress />
  //       <Recommendations />
  //     </VStack>
  //   )
}

export default Intern
