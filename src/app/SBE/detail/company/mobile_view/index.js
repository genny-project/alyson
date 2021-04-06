import {
  Avatar,
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import Status from 'app/DTT/status'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText, faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import Lane from 'app/SBE/lane'
import { replace } from 'ramda'

const CompanyMobile = ({
  name,
  status,
  url,
  panoRef,
  mapRef,
  topHeight,
  onClose,
  actions,
  sbeCode,
  beCode,
  src,
}) => {
  return (
    <Box w="100vw" h="100vh" overflowY="scroll">
      {/* <div
        ref={panoRef}
        style={{
          width: '100%',
          borderTopLeftRadius: '0.5rem',
          height: topHeight,
          marginRight: '2px',
          transition: 'height 1s',
        }}
      /> */}
      {/* 
      <div
        ref={mapRef}
        style={{
          borderTopRightRadius: '0.5rem',
          width: '100%',
          height: topHeight,
          marginLeft: '2px',
          transition: 'height 1s',
        }}
      /> */}
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          color="black"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <VStack>
        <Avatar cursor="pointer" bg="white" p="4px" src={src} w="10rem" h="10rem" zIndex="modal" />
        <Link href={url?.value}>
          <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
            {name?.value}
          </Text>
        </Link>
        <Status.Read data={status} />
        {actions.map(action => (
          <Action
            key={action}
            parentCode={sbeCode}
            targetCode={beCode}
            code={action}
            colorScheme="primary"
          />
        ))}
      </VStack>
      <VStack mb="5" align="start" pl="10" pr="10" mt="3" w="100%">
        <Attribute code={beCode} attribute={'PRI_ADDRESS_FULL'} />
        <HStack>
          <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
          <Attribute code={beCode} attribute={'PRI_MOBILE'} />
        </HStack>

        <Text textStyle="body1">Legal Name</Text>
        <Attribute code={beCode} attribute={'PRI_LEGAL_NAME'} />
        <Text textStyle="body1">ABN</Text>
        <Attribute code={beCode} attribute={'PRI_ABN'} />
        <Text textStyle="body1">Industry</Text>
        <Attribute code={beCode} attribute={'PRI_ASSOC_INDUSTRY'} />
        <Divider />
        <Text textStyle="body1">Description</Text>
        <Attribute
          code={beCode}
          attribute={'PRI_COMPANY_DESCRIPTION'}
          fallback={<Text>No company description</Text>}
        />
      </VStack>

      <Lane sbeCode={replace('SBE_HOST_CPY_', 'SBE_LINKED_INTERNSHIP_OPP_', sbeCode)} />
    </Box>
  )
}

export default CompanyMobile
