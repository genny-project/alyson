import { Box, HStack, Text, VStack, Stack } from '@chakra-ui/layout'
import { Progress } from '@chakra-ui/react'
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
  const [firstnameValue, occ, status] = useSelector(
    selectAttributes(userCode, ['PRI_FIRSTNAME', 'PRI_ASSOC_OCCUPATION', 'PRI_STATUS']),
  )

  const firstName = toUpper(firstnameValue?.value) || ''

  return (
    <Box marginLeft="72px">
      <Text
        fontFamily="Roboto"
        fontWeight="700"
        fontSize="36px"
        color="#234371"
      >{`WELCOME ${firstName}`}</Text>
      <Progress value={80} w="790px" h="13px" borderRadius="13px" colorScheme="teal" />
    </Box>
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
