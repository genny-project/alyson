import { HStack, Text, VStack } from '@chakra-ui/layout'
import { Center } from '@chakra-ui/react'
import { Iconly } from 'react-iconly'

const ContactDetails = ({ theme, phone, email }) => {
  return (
    <Center bg="white" w={'full'} h={'full'} rounded="3xl">
      <HStack w={'85%'} justify={'space-between'} alignItems={'start'} justifySelf={'center'}>
        <Text textStyle="head.2">Contact Details</Text>
        <VStack align={'start'}>
          <HStack>
            <Iconly
              name={'Call'}
              set="two-tone"
              size="medium"
              primaryColor={theme.colors.internmatch.primary}
            />
            <Text>{phone}</Text>
          </HStack>
          <HStack>
            <Iconly
              name={'Message'}
              set="two-tone"
              size="medium"
              primaryColor={theme.colors.internmatch.primary}
            />
            <Text>{email}</Text>
          </HStack>
        </VStack>
      </HStack>
    </Center>
  )
}

export default ContactDetails
