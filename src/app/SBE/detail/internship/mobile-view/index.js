import { Avatar, Box, IconButton, VStack, HStack, Text, Divider } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'

import { closeDrawer } from 'redux/app'
import DetailSubHeader from 'app/layouts/components/subheader'
import Attribute from 'app/BE/attribute'
import Software from 'app/layouts/components/software'
import RightHandDetails from '../templates/RightHandDetails'
import LinkedSupervisor from '../templates/LinkedSupervisor'

const InternshipMobileView = ({
  videoSrc,
  beCode,
  actions,
  src,
  sbeCode,
  url,
  name,
  subHeaderAttributes,
  otherAttributes,
  linkedHostCpy,
  linkedSupervisor,
  software,
}) => {
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  return (
    <Box w="100vw" h="100vh">
      <Box zIndex="modal" position="absolute" right="4" top="4">
        <IconButton
          onClick={onClose}
          color={'black'}
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>

      <Avatar
        cursor="pointer"
        left="calc(50vw - 4.75rem)"
        bg={src ? 'white' : 'lightgrey'}
        p="4px"
        src={src}
        w="10rem"
        h="10rem"
        zIndex="modal"
        mt={videoSrc ? '-5rem' : '0.5rem'}
      />
      <VStack
        mt="-5rem"
        pt="5rem"
        overflowX="hidden"
        overflowY="scroll"
        pb="1rem"
        h={videoSrc ? '65vh' : 'calc(100vh - 5rem)'}
      >
        <DetailSubHeader
          url={url}
          name={name}
          beCode={beCode}
          sbeCode={sbeCode}
          actions={actions}
          subHeaderAttributes={subHeaderAttributes}
        />
        <VStack w="100%" pl="8" spacing="3" align="start">
          <VStack align="start">
            <LinkedSupervisor sbeCode={linkedSupervisor} />
            <HStack>
              <Text w="8rem" fontWeight="semibold">
                {`Worksite`}
              </Text>
              <Attribute code={beCode} attribute={'PRI_WORKSITE'} />
            </HStack>
            <HStack>
              <Text w="8rem" fontWeight="semibold">
                {`Internship Start Date`}
              </Text>
              <Attribute code={beCode} attribute={'PRI_INTERNSHIP_START_DATE'} />
            </HStack>
            <HStack>
              <Text w="8rem" fontWeight="semibold">
                {`Days of Internship`}
              </Text>
              <Attribute code={beCode} attribute={'PRI_WHICH_DAYS_STRIPPED'} />
            </HStack>
            <HStack>
              <Text w="8rem" fontWeight="semibold">
                {`Company dress code`}
              </Text>
              <Attribute code={beCode} attribute={'PRI_DRESS_CODE'} />
            </HStack>
            <HStack>
              <Text w="8rem" fontWeight="semibold">
                {`Number of Interns`}
              </Text>
              <Attribute code={beCode} attribute={'PRI_ASSOC_NUM_INTERNS'} />
            </HStack>
          </VStack>
          <Software value={software?.value || ''} title={`Software to be Used`} />
          <Divider />
          <RightHandDetails code={beCode} sbeCode={linkedHostCpy} attributes={otherAttributes} />
        </VStack>
      </VStack>
    </Box>
  )
}

export default InternshipMobileView
