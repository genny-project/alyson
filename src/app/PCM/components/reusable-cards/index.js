import { Box, Avatar, Text } from '@chakra-ui/react'

const ReusableCard = props => {
  // const { header, subHeader, indicatorColor, src, description} = props
  // hardcoding the props for now as this logic has not been implemented in the backend yet.

  const header = 'Internship Title'
  const subHeader = 'Host Company'
  const indicatorColor = '#55B748'
  const agentFieldColor = '#E4BAC8'
  const src = 'https://i.pinimg.com/736x/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg'
  const description =
    'Lorem ipsum dolor sit amet, consectetur adipscing elit, sed do elusmod tempr.'

  const onClick = e => {
    e.preventDefault()
  }

  return (
    <>
      <Box h={'173px'} float={'left'} bg={indicatorColor} w={'9px'} />
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
        <Box
          float={'right'}
          bg={agentFieldColor}
          borderBottomLeftRadius={25}
          borderTopRightRadius={25}
          width={'65px'}
          height={'23px'}
          marginTop={'-16px'}
          marginRight={'-20.5px'}
          textAlign={'center'}
          fontSize={'9px'}
          fontWeight={'bold'}
          paddingTop={'5px'}
          color={'#000000'}
        >
          AGENT
        </Box>

        <Avatar float={'left'} borderRadius="full" boxSize="31px" marginLeft={5} src={src} />

        <Box paddingLeft={20}>
          <Text fontWeight={'bold'} fontSize={'16px'}>
            {header}
          </Text>
          <Text fontSize={'10px'}> {subHeader} </Text>
          <Text paddingBlock={4} fontSize={'11px'} lineHeight={'17.6px'}>
            {description}
          </Text>
        </Box>

        <Box
          bg="#085755"
          w={'272px'}
          h={'35px'}
          fontSize={'12px'}
          letterSpacing={'4px'}
          marginLeft={-5}
          paddingTop={'9px'}
          textAlign={'center'}
          borderBottomRightRadius={25}
          onClick={onClick}
        >
          View application
        </Box>
      </Box>
    </>
  )
}

export default ReusableCard
