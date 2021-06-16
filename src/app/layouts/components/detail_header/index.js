import { useSelector } from 'react-redux'
import { VStack, Flex, Spacer } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'

const DetailHeader = ({ beCode }) => {
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))?.value
  const video = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))?.value
  return (
    <>
      {video ? (
        <Flex w="90%" justifyContent="space-between" bg="gradient.900" mb={5}>
          <VStack justifyContent="center" spacing={5} m="auto">
            <Attribute
              config={{ size: 'xl', name: name }}
              code={beCode}
              attribute="PRI_IMAGE_URL"
            />
            <Attribute config={{ textStyle: 'head.3' }} code={beCode} attribute="PRI_NAME" />
          </VStack>
          <VStack>
            <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
          </VStack>
        </Flex>
      ) : (
        <VStack mb={5}>
          <Attribute config={{ size: 'xl', name: name }} code={beCode} attribute="PRI_IMAGE_URL" />
          <Spacer />
          <Attribute config={{ textStyle: 'head.3' }} code={beCode} attribute="PRI_NAME" />
        </VStack>
      )}
    </>
  )
}

export default DetailHeader
