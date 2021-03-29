import { Stack, Flex, Spacer, Box } from '@chakra-ui/react'
import { map } from 'ramda'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'

const Header = ({ code, sbeCode, imageSrc, headerAttribute, actions }) => {
  return (
    <Flex p="2" alignItems="start">
      <Attribute code={code} attribute={imageSrc} variant={'profile_image'} />
      <Box p="3">
        <Attribute code={code} attribute={headerAttribute} config={{ textStyle: 'head2' }} />
      </Box>

      <Spacer />
      <Box mt="6">
        <Stack direction={['row', 'column']}>
          {actions &&
            map(action => <Action parentCode={sbeCode} code={action} targetCode={code} />)(actions)}
        </Stack>
      </Box>
    </Flex>
  )
}

export default Header
