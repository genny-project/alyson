import { VStack, HStack, Box } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import DetailActions from 'app/SBE/details/template/layouts/Actions.js'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { map } from 'ramda'
import { LeftDetailAttributes } from 'app/SBE/details/template/attributes-list/index.js'
import { useColorModeValue } from '@chakra-ui/color-mode'

const LeftDetail = ({ beCode, sbeCode }) => {
  const cardBg = useColorModeValue('#F7FAFC', 'gray.600')

  return (
    <Box bg={cardBg} borderRadius="2rem 2rem 0rem 0rem" h="100vh" position="sticky" top="0rem">
      <VStack ml="10" mr="4" my="8" align="start" spacing={8} maxW="30vw">
        <Box w="full">
          <Attribute code={beCode} config={{ h: '15rem', w: '15rem' }} attribute="PRI_IMAGE_URL" />
          <Avatar
            bg="#F7FAFC"
            mt="10.5rem"
            ml="-8rem"
            p="4px"
            src={`https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg`}
            w="4.5rem"
            h="4.5rem"
            zIndex="modal"
          />
          <Avatar
            bg="#F7FAFC"
            mt="10.5rem"
            ml="-1rem"
            p="4px"
            src={`https://cdn.pixabay.com/photo/2014/05/07/06/44/cat-339400_1280.jpg`}
            w="4.5rem"
            h="4.5rem"
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
