import { Box, Text, VStack, Divider, HStack } from '@chakra-ui/react'
import { lt } from 'ramda'

const InformationCard = () => {
  const data = [
    { title: 'Available', value: '115' },
    { title: 'Applied', value: '12' },
    { title: 'Shortlisted', value: '15' },
    { title: 'Interviewing', value: '19' },
  ]

  return (
    <>
      <Box
        bg={'#FFFFFF'}
        width={'33rem'}
        height={'20rem'}
        borderRadius={'2.5rem'}
        paddingInline={'2rem'}
      >
        <VStack alignItems={'flex-start'}>
          <Text fontSize={'20px'} fontFamily={'almarai'} paddingBlock={'1.5rem'}>
            Interns / Candidates
          </Text>
          <Box
            bg={'#FFFFFF'}
            width={'29rem'}
            height={'6rem'}
            borderRadius={'1.8rem'}
            border={'1px'}
            borderColor={'#06323117'}
          ></Box>
          <Box
            bg={'#FFFFFF'}
            width={'29rem'}
            height={'6rem'}
            borderRadius={'1.8rem'}
            border={'1px'}
            borderColor={'#06323117'}
            margin={'1rem'}
          ></Box>
        </VStack>
      </Box>
    </>
  )
}

export default InformationCard
