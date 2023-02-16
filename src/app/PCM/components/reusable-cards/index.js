import { Box, Image } from '@chakra-ui/react'
import { Text as ChakraText } from '@chakra-ui/react'

const ReusableCard = props => {
  // const { header, subHeader, indicatorColor,src, description } = props
  // hardcoding the props for now as this logic has not been implemented in the backend.

  const header = 'Internship Title'
  const subHeader = 'Host Company'
  const indicatorcolor = ''
  const src = 'https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'
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
      <Image float={'left'} borderRadius="full" boxSize="31px" marginLeft={'5'} src={src} />
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
        w={'272px'}
        h={'39px'}
        fontSize={'12px'}
        letterSpacing={'5px'}
        marginLeft={'-5'}
        paddingTop={'10px'}
        borderBottomRightRadius={25}
        paddingInline={'12'}
        onClick={onClick}
      >
        {' '}
        View application
      </Box>
    </Box>
  )
}

export default ReusableCard
