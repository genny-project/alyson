import { VStack, HStack, Box } from '@chakra-ui/layout'
import DetailActions from 'app/SBE/details/template/layouts/Actions.js'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { map } from 'ramda'
import { LeftDetailAttributes } from 'app/SBE/details/template/attributes-list/index.js'

const LeftDetail = ({ beCode, sbeCode }) => {
  return (
    <Box bg="#F7FAFC" borderRadius="2rem 2rem 0rem 0rem">
      <VStack mx="10" my="8" align="start" spacing={8} maxW="30vw">
        <Attribute code={beCode} config={{ h: '15rem', w: '15rem' }} attribute="PRI_IMAGE_URL" />
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
