import Ask from 'app/ASKS/ask'
import { VStack, Center, Heading, useColorModeValue, Text, Divider } from '@chakra-ui/react'
import { map } from 'ramda'

const FormDesktopView = ({ title, childAsks, onFinish, questionCode, shadow, config = {} }) => {
  const bgColor = useColorModeValue('white', 'whiteAlpha.100')

  const { subHeader, divider = [] } = config

  console.log(divider)
  return (
    <Center
      bgColor={bgColor}
      borderRadius="md"
      shadow={shadow ? 'base' : ''}
      mr={shadow ? '10vw' : ''}
      ml={shadow ? '10vw' : ''}
      pt="1rem"
    >
      <VStack p="3" spacing={8} marginBottom={8}>
        <Heading>{title}</Heading>
        {config ? <Text textStyle="head2">{subHeader}</Text> : null}
        {childAsks.map((childAsk, idx) => (
          <>
            <Ask
              onFinish={onFinish}
              key={childAsk}
              parentCode={questionCode}
              questionCode={childAsk}
            />
            {divider.includes(idx) && <Divider />}
          </>
        ))}
      </VStack>
    </Center>
  )
}

export default FormDesktopView
