import { Box, HStack, Text, VStack } from '@chakra-ui/layout'
import { Center } from '@chakra-ui/react'

const LinkedOpportunities = ({ hostedInterns, currentOpportunities }) => {
  return (
    <Center bg="white" w={'full'} h={'full'} rounded="3xl">
      <VStack w={'85%'} justify={'space-between'} alignItems={'start'} justifySelf={'center'}>
        <Text textStyle="head.2">Linked Opportunities</Text>
        <HStack spacing={'2rem'}>
          <Box>
            <Text textStyle="body.3">Hosted Interns</Text>
            <Text>{hostedInterns}</Text>
          </Box>
          <Box>
            <Text textStyle="body.3">Current Opportunities</Text>
            <Text>{currentOpportunities}</Text>
          </Box>
        </HStack>
      </VStack>
    </Center>
  )
}

export default LinkedOpportunities
