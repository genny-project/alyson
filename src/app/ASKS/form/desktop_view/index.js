import { VStack, Center, Heading, useColorModeValue, Text, Divider, Box } from '@chakra-ui/react'
import { includes } from 'ramda'

import Ask from 'app/ASKS/ask'

const FormDesktopView = ({ title, childAsks, onFinish, questionCode, shadow, config = {} }) => {
  const fullwidthForm = includes('QUE_INTERVIEW')(childAsks)
  const bgColor = useColorModeValue('white', 'whiteAlpha.100')

  const { subHeader, divider = {} } = config

  return (
    <Center
      bgColor={bgColor}
      borderRadius="md"
      shadow={shadow ? 'base' : ''}
      mr={shadow ? '10vw' : ''}
      ml={shadow ? '10vw' : ''}
      pt="1rem"
    >
      <VStack p="3" spacing={8} marginBottom={8} w={fullwidthForm ? '90%' : 'inherit'}>
        <Heading>{title}</Heading>
        {config ? <Text textStyle="head2">{subHeader}</Text> : null}
        {childAsks.map((childAsk, idx) => (
          <Box w="full" key={childAsk}>
            {divider.hasOwnProperty(idx + 1) && (
              <VStack align="start" w="full">
                <Text textStyle="body3">{divider[idx + 1].label}</Text>
                <Divider />
              </VStack>
            )}
            <Ask
              onFinish={onFinish}
              key={childAsk}
              parentCode={questionCode}
              questionCode={childAsk}
            />
          </Box>
        ))}
      </VStack>
    </Center>
  )
}

export default FormDesktopView
