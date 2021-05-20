import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'

const Tile = ({ w, h, icon, header, attributes, beCode, ...rest }) => {
  return (
    <Card variant="card0" {...{ w, h }} {...rest}>
      <VStack align="start">
        <HStack>
          <Box m="1">{icon}</Box>
          <Text textStyle="body.1">{header}</Text>
        </HStack>
        {attributes.map(({ label, attr, color }) => (
          <VStack align="start" key={attr}>
            <Text textStyle="tail.3">{label}</Text>
            <Text color={color} minH="1rem">
              <Attribute code={beCode} attribute={attr} />
            </Text>
          </VStack>
        ))}
      </VStack>
    </Card>
  )
}

export default Tile
