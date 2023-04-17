import { Box, HStack, Text, VStack } from '@chakra-ui/react'

const CompanyOverviewCard = () => {
  const industryInformation = 'Marketing, Design, Branding'
  const specializationInfo = 'Digital Marketing, UI/UX Design, Web Development, Branding'
  const description =
    'Brunch tote bag glossier twee, organic offal semiotics microdosing tattooed before they sold out. Brunch distillery prism iPhone, snackwave trust fund sriracha sriracha single-origin snackwave trust fund sriracha sriracha single-origin snackwave trust fund sriracha sriracha single-origin snackwave trust fund sriracha sriracha single-origin snackwave trust fund sriracha sriracha sriracha single-origin coffee listicle paleo etsy fashion axe intelligentsia brunch tote bag glossier twee, organic offal seminotics.'

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
          <Text fontSize={'12px'} color={'#829998'} marginBottom={'-0.5rem'}>
            {'Industry'}
          </Text>
          <Text fontSize={'16px'}>{industryInformation}</Text>
        </VStack>

        <VStack alignItems={'flex-start'} paddingBlock={'2rem'} paddingInline={'3rem'} flex={1.5}>
          <Text fontSize={'12px'} color={'#829998'} marginBottom={'-0.5rem'}>
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
        <Text fontSize={'12px'} color={'#829998'} marginBottom={'-0.5rem'}>
          {'About Us'}
        </Text>
        <Text fontSize={'16px'}>{description}</Text>
      </VStack>
    </Box>
  )
}

export default CompanyOverviewCard
