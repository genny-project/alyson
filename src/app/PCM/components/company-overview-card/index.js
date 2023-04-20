import { Box, HStack, Text, VStack } from '@chakra-ui/react'

import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const CompanyOverviewCard = ({ targetCode }) => {
  const description = useSelector(selectCode(targetCode, 'PRI_COMPANY_DESCRIPTION'))?.value || '-'
  const industryInformation = useSelector(selectCode(targetCode, 'LNK_BEST_KEYWORD'))?.value || '-'
  const specializationInfo = useSelector(selectCode(targetCode, 'LNK_BEST_KEYWORD'))?.value || '-'

  return (
    <Box
      width={'33rem'}
      height={'30rem'}
      bg={'#FFFFFF'}
      borderRadius={'2.5rem'}
      fontFamily={'Almarai'}
    >
      <HStack alignItems={'flex-start'}>
        <VStack alignItems={'flex-start'} paddingBlock={'2rem'} paddingInline={'3rem'} flex={1}>
          <Text fontSize={'12px'} color={'#829998'}>
            {'Industry'}
          </Text>
          <Text fontSize={'16px'}>{industryInformation}</Text>
        </VStack>

        <VStack alignItems={'flex-start'} paddingBlock={'2rem'} paddingInline={'3rem'} flex={1.5}>
          <Text fontSize={'12px'} color={'#829998'}>
            {'Specialization'}
          </Text>
          <Text fontSize={'16px'}>{specializationInfo}</Text>
        </VStack>
      </HStack>
      <VStack
        alignItems={'flex-start'}
        paddingBlock={'2rem'}
        paddingInline={'3rem'}
        marginTop={'-1rem'}
      >
        <Text fontSize={'12px'} color={'#829998'}>
          {'About Us'}
        </Text>
        <Text dangerouslySetInnerHTML={{ __html: description }} fontSize={'1rem'} />
      </VStack>
    </Box>
  )
}

export default CompanyOverviewCard
