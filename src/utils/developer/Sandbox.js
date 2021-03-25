import { Avatar, Box, Center, Flex, Text, Stack, useColorModeValue } from '@chakra-ui/react'

const Sandbox = () => {
  return (
    <Center py={6}>
      <Box
        maxW={'300px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Flex justify={'center'} mt={8}>
          <Avatar
            size={'xl'}
            src={
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
            }
            alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>
        <Box p={4}>
          <Stack spacing={0} align={'center'} mb={4}>
            <Text textStyle="head1">John</Text>
            <Text textStyle="head2">Jonathan Lorem Doe</Text>
          </Stack>
          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text textStyle="body1">Developer</Text>
              <Text textStyle="body2">Role</Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text textStyle="body1"> Outcome.Life</Text>
              <Text textStyle="body2">Company</Text>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}

export default Sandbox
