import { Box, HStack, VStack, Text, useTheme } from '@chakra-ui/react'

import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'

const DefaultEvtButton = ({ name, questionCode, vert, handleClick }) => {
  const theme = useTheme()
  const bgColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || '#234371'
  const color = theme.colors.text.dark

  let text = (
    <Text color={color} fontSize={vert ? 12 : 15} fontWeight="700">
      {name}
    </Text>
  )

  return vert ? (
    <VStack
      spacing={2}
      role="group"
      p="0"
      test-id={questionCode}
      onClick={handleClick}
      as="button"
      w={'full'}
    >
      {text}
    </VStack>
  ) : (
    <Box padding={1} borderRadius="lg" background={bgColor}>
      <HStack
        role="group"
        p="1"
        test-id={questionCode}
        onClick={handleClick}
        as="button"
        w={'full'}
      >
        {text}
      </HStack>
    </Box>
  )
}

export default DefaultEvtButton
