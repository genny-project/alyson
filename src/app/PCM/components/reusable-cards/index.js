import { Box, Image } from '@chakra-ui/react'
import { Text as ChakraText } from '@chakra-ui/react'

const ReusableCard = props => {
  // const {header, subHeader, indicatorColor, description } = props
  // hardcoded the props for now as this logic has not been implemented in the backend.

  const header = 'Internship Title'
  const subHeader = 'Host Company'
  const indicatorcolor = ''
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipscing elit, sed do elusmod tempr.'

  const onClick = () => {
    console.log('hello')
  }

  return (
    <Box
      bg="#063231"
      w={'272px'}
      borderRadius={5}
      h={'173px'}
      color="white"
      paddingBlock={4}
      paddingInline={5}
      borderBottomRightRadius={25}
      borderTopRightRadius={25}
      fontFamily={'PP Neue Montreal'}
    >
      <Image
        float={'left'}
        borderRadius="full"
        boxSize="31px"
        marginLeft={'5'}
        src="https://bit.ly/dan-abramov"
      />
      <Box paddingLeft={20}>
        <ChakraText fontWeight={'bold'} fontSize={'16px'}>
          {' '}
          {header}{' '}
        </ChakraText>
        <ChakraText fontSize={'10px'}> {subHeader} </ChakraText>
        <ChakraText paddingBlock={4} fontSize={'11px'} lineHeight={'17.6px'}>
          {' '}
          {description}{' '}
        </ChakraText>
      </Box>

      <Box
        bg={'#074740'}
        position={'absolute'}
        w={'272px'}
        h={'39px'}
        fontSize={'12px'}
        letterSpacing={'5px'}
        marginLeft={'-5'}
        marginTop={'1'}
        borderBottomRightRadius={25}
        paddingInline={'10'}
        onClick={onClick}
      >
        {' '}
        View application
      </Box>
    </Box>
  )
}

export default ReusableCard
