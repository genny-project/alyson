import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { Iconly } from 'react-iconly'

const ContactDetailsCard = () => {
  const title = 'Contact Details'
  const phoneNumber = '+61 0410 604 021'
  const email = 'gerard@outcome.life'

  return (
    <Box
      width={'33rem'}
      height={'10rem'}
      bg={'#FFFFFF'}
      borderRadius={'2.5rem'}
      paddingInline={'1rem'}
      fontFamily={'Almarai'}
    >
      <HStack
        paddingInline={'3rem'}
        paddingBlock={'2rem'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
      >
        <Text fontSize={'20px'}>{title}</Text>
        <VStack alignItems={'flex-start'}>
          <HStack>
            <Iconly name={'Call'} set={'light'} />
            <Text fontSize={'14px'}>{phoneNumber} </Text>
          </HStack>
          <HStack>
            <Iconly name={'Message'} set={'two-tone'} />
            <Text fontSize={'14px'}>{email} </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}

export default ContactDetailsCard
