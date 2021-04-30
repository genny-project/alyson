import { VStack, Center, Heading, useColorModeValue, Text, Divider, Box } from '@chakra-ui/react'
import { includes } from 'ramda'

import Ask from 'app/ASKS/ask'

const FormDesktopView = ({ title, childAsks, onFinish, questionCode, shadow, config = {} }) => {
  const fullwidthForm = includes('QUE_INTERVIEW')(childAsks)
  const bgColor = useColorModeValue('white', 'whiteAlpha.100')

  const configg = {
    subHeader: 'Please tell us a little about yourself',
    divider: {
      2: { label: 'Personal' },
      4: { label: 'Contact' },
      6: { label: 'More Info' },
      8: { label: 'Business' },
    },
  }
  const { subHeader, divider = {} } = configg

  return (
    <Center
      bgColor={bgColor}
      borderRadius="md"
      shadow={shadow ? 'base' : ''}
      mr={shadow ? '25vw' : ''}
      ml={shadow ? '25vw' : ''}
      minimumWidth='max-content'
      p='8'
    >
      <VStack p="3" spacing={8} marginBottom={8} w={fullwidthForm ? '90%' : 'inherit'}>
        <Text textStyle='head1'>{title}</Text>
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
