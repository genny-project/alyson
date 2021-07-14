import { VStack, HStack, Box, Flex } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import DetailActions from 'app/SBE/details/template/layouts/Actions.js'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { map } from 'ramda'
import { LeftDetailAttributes } from 'app/SBE/details/template/attributes-list/index.js'

const LeftDetail = ({ beCode, sbeCode }) => {
  return (
    <Box bg="#F7FAFC" borderRadius="2rem 2rem 0rem 0rem" h="100vh" position="sticky" top="0rem">
      <VStack ml="10" mr="4" my="8" align="start" spacing={8} maxW="30vw">
        <Box w="full">
          <Attribute code={beCode} config={{ h: '15rem', w: '15rem' }} attribute="PRI_IMAGE_URL" />
          <Avatar
            bg="white"
            mt="10.8rem"
            ml="-8rem"
            p="2px"
            src={`https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg`}
            w="4rem"
            h="4rem"
            zIndex="modal"
          />
          <Avatar
            bg="white"
            mt="10.8rem"
            ml="-0.5rem"
            p="2px"
            src={`https://cdn.pixabay.com/photo/2014/05/07/06/44/cat-339400_1280.jpg`}
            w="4rem"
            h="4rem"
            zIndex="modal"
          />
        </Box>

        <VStack align="start" spacing={4}>
          <HStack spacing={5}>
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_NAME" />
            <Attribute config={{ color: '#3182CE' }} code={beCode} attribute="PRI_LINKEDIN_URL" />
          </HStack>
          <Attribute code={beCode} attribute="PRI_STAR_RATING" />
          <DetailActions beCode={beCode} sbeCode={sbeCode} />
          <VStack align="start" spacing={4}>
            {map(({ icon, attr, config }) => {
              return (
                <HStack spacing={4}>
                  <FontAwesomeIcon icon={icon} opacity="0.6" />
                  <Attribute code={beCode} attribute={attr} config={config} />
                </HStack>
              )
            })(LeftDetailAttributes)}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default LeftDetail
