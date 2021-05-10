import { map } from 'ramda'
import { Box, VStack } from '@chakra-ui/react'

import Label from 'app/BE/attribute/Label'
import Attribute from 'app/BE/attribute'
import LinkedHostCpy from './LinkedHostCpy'

const RightHandDetails = ({ videoData, code, attributes, sbeCode, beCode }) => {
  return (
    <VStack>
      {videoData && (
        <Attribute
          code={beCode}
          attribute={'PRI_VIDEO_URL'}
          config={{ inline: true }}
          styles={{ width: '100%' }}
        />
      )}
      <LinkedHostCpy sbeCode={sbeCode} />
      <Box w="full">
        {map(attr => (
          <VStack align="start">
            <Label code={code} attribute={attr} />
            <Box p="5">
              <Attribute code={code} attribute={attr} />
            </Box>
          </VStack>
        ))(attributes)}
      </Box>
    </VStack>
  )
}

export default RightHandDetails
