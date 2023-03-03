import { Box, Divider, HStack, Text, VStack } from '@chakra-ui/react'
import { lt } from 'ramda'

const ProfileStatisticsCard = () => {
  const data = [
    { title: 'Internships suitable for you', value: '17' },
    { title: 'People have viewed your profile', value: '100' },
    { title: 'Applications pending', value: '5' },
  ]

  return (
    <>
      <Box
        bg={'#EDF8F8'}
        width={'34rem'}
        h={'13rem'}
        borderRadius={'2.5rem'}
        paddingBlock={'2.5rem'}
        marginLeft={'2rem'}
      >
        <Text
          justifyContent={'flex-start'}
          marginLeft={'2rem'}
          marginTop={'-1rem'}
          fontSize={'20px'}
        >
          Your Statistics
        </Text>
        <Box
          bg={''}
          w={'30rem'}
          h={'6rem'}
          marginTop={'1rem'}
          marginLeft={'2rem'}
          borderRadius={'1.8rem'}
          display={'inline-flex'}
          border={'1px'}
          borderColor={'#06323117'}
        >
          {data.map(({ title, value }, index) => (
            <HStack
              key={`${index}-${title}`}
              w={'25rem'}
              h={'3rem'}
              marginTop={'1.5rem'}
              justifyContent={'center'}
              paddingInline={'1rem'}
            >
              <Box marginRight={'0.75rem'}>
                <Text
                  fontSize={'1.6rem'}
                  textAlign={'center'}
                  color={'#55B748'}
                  marginBottom={'-5px'}
                >
                  {value}
                </Text>
                <Text
                  fontSize={'0.75rem'}
                  maxW={'6.5rem'}
                  textAlign={'center'}
                  wordBreak={'break-word'}
                >
                  {title}
                </Text>
              </Box>
              {lt(index, 2) ? (
                <Divider orientation={'vertical'} h={'3.1rem'} borderColor={'#06323161'} />
              ) : null}
            </HStack>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default ProfileStatisticsCard
