import { Flex, Spacer, Box } from '@chakra-ui/react'
import { map } from 'ramda'
import { useBreakpointValue, HStack } from '@chakra-ui/react'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import HeaderActions from './header-actions'

const Header = ({ beCode, sbeCode, imageSrc, headerAttribute, actions }) => {
  const mobile = useBreakpointValue({ base: true, lg: false })

  return (
    <Flex p="2" alignItems="start">
      <Attribute code={beCode} attribute={imageSrc} variant={'profile_image'} />
      <Box p="3">
        <Attribute
          code={beCode}
          attribute={headerAttribute}
          config={{ fontSize: '3xl', fontWeight: 'semibold' }}
        />
      </Box>
      <Spacer />
      <Box mt="6">
        {mobile ? (
          <HeaderActions actions={actions} beCode={beCode} sbeCode={sbeCode} />
        ) : (
          actions && (
            <HStack>
              {map(action => <Action parentCode={sbeCode} code={action} targetCode={beCode} />)(
                actions,
              )}
            </HStack>
          )
        )}
      </Box>
    </Flex>
  )
}

export default Header
