import { Box, Flex, Spacer, Stack } from '@chakra-ui/react'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import DetailSection from 'app/layouts/components/detail_section'
import { map } from 'ramda'

const Header = ({ contactDetails, code, sbeCode, imageSrc, headerAttribute, actions }) => {
  return (
    <Flex p="2" alignItems="start">
      <Attribute code={code} attribute={imageSrc} variant={'profile_image'} />
      <Box p="3">
        <Attribute code={code} attribute={headerAttribute} config={{ textStyle: 'head.2' }} />
      </Box>

      <Spacer />
      <Box mt="6">
        <Stack direction={['row', 'column']}>
          {actions &&
            map(action => (
              <Action
                key={`${code}-${action}`}
                parentCode={sbeCode}
                code={action}
                targetCode={code}
              />
            ))(actions)}
        </Stack>
      </Box>
      {contactDetails && <DetailSection code={code} details={contactDetails} />}
    </Flex>
  )
}

export default Header
