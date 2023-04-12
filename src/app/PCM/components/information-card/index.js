import { Box, Text, Divider, HStack } from '@chakra-ui/react'
import { lt } from 'ramda'

const InformationCard = () => {
  const cardTitle = 'Interns / Candidates'
  const data = [
    { title: 'Available', value: '115' },
    { title: 'Applied', value: '12' },
    { title: 'Shortlisted', value: '15' },
    { title: 'Interviewing', value: '19' },
  ]

  const moreData = [
    { title: 'Offered', value: '11' },
    { title: 'Placed', value: '5' },
  ]

  return (
    <>
      <Box
        bg={'#FFFFFF'}
        width={'33rem'}
        h={'20rem'}
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
          {cardTitle}
        </Text>
        <Box
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
              <Box marginRight={'1.25rem'}>
                <Text
                  fontSize={'1.6rem'}
                  textAlign={'center'}
                  color={'#EA5024'}
                  marginBottom={'-5px'}
                >
                  {value}
                </Text>
                <Text fontSize={'0.75rem'} maxW={'6.5rem'} textAlign={'center'}>
                  {title}
                </Text>
              </Box>
              {lt(index, data.length - 1) ? (
                <Divider
                  orientation={'vertical'}
                  h={'3.1rem'}
                  borderColor={'#06323161'}
                  marginInlineStart={'1.5rem'}
                />
              ) : null}
            </HStack>
          ))}
        </Box>
        <Box
          w={'30rem'}
          h={'6rem'}
          marginTop={'1rem'}
          marginLeft={'2rem'}
          borderRadius={'1.8rem'}
          display={'flex'}
          border={'1px'}
          borderColor={'#06323117'}
        >
          {moreData.map(({ title, value }, index) => (
            <HStack
              key={`${title}-${index}`}
              justifyContent={'flex-start'}
              h={'3rem'}
              marginTop={'1.5rem'}
              paddingInline={'1rem'}
            >
              <Box marginRight={'1.5rem'}>
                <Text
                  fontSize={'1.6rem'}
                  textAlign={'center'}
                  color={'#EA5024'}
                  marginBottom={'-5px'}
                  marginLeft={'0.5rem'}
                >
                  {value}
                </Text>
                <Text
                  fontSize={'0.75rem'}
                  maxW={'6.5rem'}
                  textAlign={'center'}
                  marginLeft={'0.5rem'}
                >
                  {title}
                </Text>
              </Box>
              {lt(index, moreData.length - 1) ? (
                <Divider
                  orientation={'vertical'}
                  h={'3.1rem'}
                  borderColor={'#06323161'}
                  marginInlineStart={'1.5rem'}
                />
              ) : null}
            </HStack>
          ))}
        </Box>
      </Box>
    </>
  )
}

export default InformationCard
