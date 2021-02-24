import { Stack, Flex, Spacer, Box, Text } from '@chakra-ui/react'
import { map } from 'ramda'

import Action from 'app/BE/action'
import Attribute from 'app/BE/attribute'
import DetailSection from '../../default-view/templates/detail-section'

const Header = ({ contactDetails, code, sbeCode, imageSrc, headerAttribute, actions }) => {
  return (
    <Flex p="2" alignItems="start">
      <Attribute code={code} attribute={imageSrc} variant={'profile_image'} />
      <Box pl="3">
        <Attribute
          code={code}
          attribute={headerAttribute}
          config={{ fontSize: '3xl', fontWeight: 'semibold' }}
        />
        <Text>
          <Attribute code={code} attribute={'PRI_NAME'} /> Internship
        </Text>
      </Box>
      {contactDetails && <DetailSection noTitle row code={code} details={contactDetails} />}

      <Spacer />
      <Box mt="6">
        <Stack direction={['row', 'column']}>
          {actions &&
            map(action => (
              <Action key={action} parentCode={sbeCode} code={action} targetCode={code} />
            ))(actions)}
        </Stack>
      </Box>
    </Flex>
  )
}

export default Header
