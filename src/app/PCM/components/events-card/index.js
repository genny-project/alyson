import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { Iconly } from 'react-iconly'

const EventsCard = () => {
  const title = 'Pitcher Partner'
  const position = 'Junior Accountant'
  const date = '20/09/2023'

  return (
    <>
      <Box bg={'#063231'} w={'12rem'} h={'7.5rem'} borderRadius={'1.25rem'}>
        <VStack alignItems={'flex-start'} paddingBlock={'1rem'} marginLeft={'1rem'}>
          <Text color={'white'} fontSize={'16px'} marginBottom={'-0.7rem'}>
            {title}
          </Text>
          <Text color={'white'} fontSize={'14px'}>
            {position}
          </Text>
        </VStack>
        <Box bg={'#085755'} w={'12rem'} h={'2.5rem'} borderRadius={'1.25rem'} marginTop={'0.5rem'}>
          <HStack justifyContent={'flex-end'} marginRight={'1.5rem'} paddingBlock={'0.5rem'}>
            <Iconly name={'Calendar'} set={'two-tone'} primaryColor={'#FFFFFF'} size={'small'} />
            <Text fontSize={'12px'} color={'white'}>
              {date}
            </Text>
          </HStack>
        </Box>
      </Box>
    </>
  )
}

export default EventsCard
