import { Box, Collapse, HStack, Spacer, Text, VStack, useDisclosure } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { map } from 'ramda'

const DetailCard = ({ beCode, detailSectionType }) => {
  const { isOpen, onToggle } = useDisclosure()
  const { icon, header, attributes } = detailSectionType
  return (
    <Card variant="card0" onClick={onToggle} w="full">
      <VStack align="start" spacing={6}>
        <HStack w="full" pr="4" spacing={3}>
          {icon && <Box m="1">{icon}</Box>}
          {header && <Text textStyle="body.1">{header}</Text>}
          <Spacer />
          <Box
            cursor="pointer"
            transform={isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="all 0.2s ease"
          >
            <FontAwesomeIcon icon={faChevronDown} onClick={onToggle} />
          </Box>
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          <VStack align="start" spacing={6}>
            {map(({ label, attr, config = {} }) => (
              <VStack align="start" key={`${beCode}_${attr}`}>
                <Text textStyle="tail.3">{label}</Text>
                <Box minH="1rem">
                  <Attribute code={beCode} attribute={attr} config={config} />
                </Box>
              </VStack>
            ))(attributes)}
          </VStack>
        </Collapse>
      </VStack>
    </Card>
  )
}

export default DetailCard
