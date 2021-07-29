import { map, equals } from 'ramda'
import { useSelector } from 'react-redux'
import { VStack, HStack, Box, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/color-mode'
import ShowIconIfNotEmpty from 'app/SBE/detail-profile/ShowIconIfNotEmpty.js'

import DetailActions from 'app/SBE/detail-profile/detail-layout/application/templates/Actions.js'
import { LeftDetailAttributesApplication } from 'app/SBE/detail-profile/detail-layout/application/templates/AttributesList.js'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import getUserType from 'utils/helpers/get-user-type'
import sameLength from 'redux/utils/same-length'
import { selectCode } from 'redux/db/selectors'

const LeftDetail = ({ beCode, sbeCode }) => {
  const userCode = useSelector(selectCode('USER'), equals)
  const userType = getUserType(useSelector(selectCode(userCode), sameLength))
  const cardBg = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      bg={cardBg}
      borderRadius="2rem 2rem 0rem 0rem"
      h="100vh"
      position="sticky"
      top="0rem"
      minW="25vw"
      maxW="27vw"
    >
      <VStack ml="10" mr="6" my="8" align="start" spacing={8} maxW="30vw">
        <VStack align="start">
          <Box w="full">
            <Attribute
              code={beCode}
              attribute={`_LNK_HOST_COMPANY__PRI_IMAGE_URL`}
              config={{ h: '10rem', w: '10rem' }}
            />
            <Attribute
              code={beCode}
              attribute={`_PRI_INTERN_CODE__PRI_IMAGE_URL`}
              config={{ h: '10rem', w: '10rem', ml: '-1rem' }}
            />
          </Box>
          <HStack spacing={4} pt={2}>
            <Attribute
              config={{ textStyle: 'body.1' }}
              code={beCode}
              attribute="_PRI_INTERN_CODE__PRI_NAME"
            />
            <Attribute code={beCode} attribute="_PRI_INTERN_CODE__PRI_LINKEDIN_URL" />
          </HStack>
          <Text>{`is applying at`}</Text>
          <Attribute
            code={beCode}
            attribute={`_LNK_INTERNSHIP__LNK_OCCUPATION__PRI_NAME`}
            config={{ detailViewTags: true }}
          />
          <HStack spacing={4}>
            <Attribute
              config={{ textStyle: 'body.1' }}
              code={beCode}
              attribute="_LNK_INTERNSHIP__LNK_HOST_COMPANY__PRI_NAME"
            />
            <Attribute code={beCode} attribute="_LNK_HOST_COMPANY__PRI_LINKEDIN_URL" />
          </HStack>
        </VStack>
        {(userType === 'AGENT' || userType === 'ADMIN') && (
          <DetailActions beCode={beCode} sbeCode={sbeCode} />
        )}
        <VStack align="start" spacing={4}>
          <Text textStyle="body.1">{`Supervisor Details:`}</Text>
          <VStack align="start" spacing={2}>
            {map(({ icon, attr, attrSecond, attrOptional, config }) => (
              <ShowIconIfNotEmpty
                icon={icon}
                attr={attr}
                attrOptional={attrOptional}
                attrSecond={attrSecond}
                config={config}
                beCode={beCode}
              />
            ))(LeftDetailAttributesApplication)}
          </VStack>
        </VStack>
        <VStack align="start">
          <Text textStyle="body.1">{`Agent associated with the Intern:`}</Text>
          <HStack>
            <Attribute
              code={beCode}
              attribute={`_PRI_INTERN_CODE__LNK_AGENT__PRI_IMAGE_URL`}
              config={{ h: '3rem', w: '3rem', ml: '-1rem' }}
            />
            <Attribute code={beCode} attribute={`_PRI_INTERN_CODE__LNK_AGENT__PRI_NAME`} />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default LeftDetail
