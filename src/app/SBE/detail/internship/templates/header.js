import { Text, VStack, HStack } from '@chakra-ui/react'
import { map } from 'ramda'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'

const Header = ({ code, sbeCode, imageSrc, headerAttribute, actions }) => {
  return (
    <VStack p="2" align="start">
      <HStack align="start">
        <Attribute code={code} attribute={imageSrc} variant={'profile_image'} />
        <Attribute code={code} attribute={headerAttribute} config={{ textStyle: 'head2' }} />
      </HStack>
      <VStack>
        <Text textStyle="body1">
          <Attribute code={code} attribute={'PRI_NAME'} />
        </Text>
        <Attribute code={code} attribute={'PRI_ADDRESS_FULL'} />
      </VStack>

      <HStack>
        {actions &&
          map(action => (
            <Action key={action} parentCode={sbeCode} code={action} targetCode={code} />
          ))(actions)}
      </HStack>
    </VStack>
  )
}

export default Header
