import { Avatar, Box, Divider, Grid, Text, VStack } from '@chakra-ui/react'

const StaffCard = () => {
  const staffName = 'Paris Young'
  const position = 'Product Manager'
  const companyName = 'Pascal Satori'
  const onClick = e => {
    e.preventDefault()
  }

  return (
    <Box
      w={'16rem'}
      height={'9.25rem'}
      bg={'#F0F1EB'}
      borderRadius={'0.6rem'}
      paddingBlock={'1rem'}
      paddingInline={'1rem'}
      fontFamily={'Almarai'}
      border={'1px'}
      borderColor={'#B4C1C1'}
    >
      <Grid templateColumns={'repeat(2, 1fr)'}>
        <Avatar src="https://bit.ly/dan-abramov" size={'lg'} />
        <VStack alignItems={'flex-start'} spacing={'-0.25'}>
          <Text fontSize={'16px'}>{staffName} </Text>
          <Divider width={'7.5rem'} orientation={'horizontal'} borderColor={'#B4C1C1'} />
          <Text fontSize={'14px'}>{position} </Text>
          <Text fontSize={'12px'} color={'#829998'} marginTop={'-0.25rem'}>
            {companyName}{' '}
          </Text>
        </VStack>
      </Grid>
      <Box
        fontSize={'16px'}
        color={'#EA5024'}
        marginTop={'1.5rem'}
        marginLeft={'0.75rem'}
        onClick={onClick}
        cursor={'pointer'}
      >
        {'View Managed Opportunities'}
      </Box>
      {/* <Text fontSize={'16px'} color={'#EA5024'} marginTop={'1.5rem'} marginLeft={'0.75rem'}>{'View Managed Opportunities'} </Text> */}
    </Box>
  )
}

export default StaffCard
