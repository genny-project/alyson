import { map } from 'ramda'
import { Box, HStack, Text, VStack } from '@chakra-ui/layout'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'

const DetailCard = ({ beCode, detailSectionType }) => {
  const { icon, header, attributes } = detailSectionType
  return (
    <Card variant="card0">
      <VStack align="start" spacing={6}>
        <HStack>
          {icon && <Box m="1">{icon}</Box>}
          {header && <Text textStyle="body.1">{header}</Text>}
        </HStack>
        {map(({ label, attr, detilViewTags, config = {} }) => (
          <VStack align="start" key={attr}>
            <Text textStyle="tail.3">{label}</Text>
            <Text minH="1rem">
              <Attribute
                code={beCode}
                attribute={attr}
                config={config}
                detilViewTags={detilViewTags}
              />
            </Text>
          </VStack>
        ))(attributes)}
      </VStack>
    </Card>
  )
}

export default DetailCard
