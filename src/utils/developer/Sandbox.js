import {
  Heading,
  Avatar,
  Box,
  Center,
  IconButton,
  Flex,
  Text,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

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
            <Heading fontSize={'2xl'} fontWeight={600} fontFamily={'body'}>
              John
            </Heading>
            <Text color={'gray.500'}>Jonathan Lorem Doe</Text>
          </Stack>
          <Stack direction={'row'} justify={'center'} spacing={6}>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={500}>Developer</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Role
              </Text>
            </Stack>
            <Stack spacing={0} align={'center'}>
              <Text fontWeight={500}> Outcome.Life</Text>
              <Text fontSize={'sm'} color={'gray.500'}>
                Company
              </Text>
            </Stack>
          </Stack>
          <Stack direction={'row'} justify={'center'} spacing={6} m={8}>
            <Stack spacing={0} align={'center'}>
              <IconButton
                transition="all 0.2s"
                bgGradient={'linear(to-br, teal.400,blue.500)'}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                icon={<FontAwesomeIcon icon={faPhoneAlt} />}
              />
            </Stack>
            <Stack spacing={0} align={'center'}>
              <IconButton
                transition="all 0.2s"
                bgGradient={'linear(to-br, teal.400,blue.500)'}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                icon={<FontAwesomeIcon icon={faEnvelope} />}
              />
            </Stack>
            <Stack spacing={0} align={'center'}>
              <IconButton
                transition="all 0.2s"
                bgGradient={'linear(to-br, teal.400,blue.500)'}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
              />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}

export default Sandbox
