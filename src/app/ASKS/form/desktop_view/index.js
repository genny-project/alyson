import { VStack, useColorModeValue, Text, Box } from '@chakra-ui/react'
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
    <Box
      borderRadius="md"
      mr={shadow ? '25vw' : ''}
      ml={shadow ? '25vw' : ''}
      minimumWidth='max-content'
    >
        <Box
          bgColor={bgColor}
          borderRadius="md"
          shadow={shadow ? 'base' : ''}
          minimumWidth='max-content'
          p='8'
          mb='4'
        >
          <Text textStyle='head1' w="100%" mb='2'>{title}</Text>
          {config ? <Text textStyle="body3" w="100%">{subHeader}</Text> : null}
        </Box>
      <VStack
        spacing='6'
        mb='8'
        p='8'
        w={fullwidthForm ? '90%' : 'inherit'}
        bgColor={bgColor}
        borderRadius="md"
        shadow={shadow ? 'base' : ''}
      >
        {childAsks.map((childAsk, idx) => (
          <Box w="full" key={childAsk}>
            {divider.hasOwnProperty(idx + 1) && (
              <VStack align="start" w="full" mb='3'>
                <Text textStyle="head1">{divider[idx + 1].label}</Text>
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
    </Box>
  )
}

export default FormDesktopView
