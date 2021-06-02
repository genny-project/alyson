import { Grid, Box, VStack, Text, Spacer, Image, HStack } from '@chakra-ui/react'
import { map } from 'ramda'

const items = ['one', 'two', 'three', 'four', 'five', 'six', 'seven']

const Recommendation = ({ setShowDetailView }) => {
  return (
    <Box
      w="50%"
      bg="gray.100"
      h="80vh"
      spacing={10}
      m={10}
      textAlign="center"
      p="5"
      overflowY="scroll"
    >
      <Text textStyle="head.2">{`Please select a Mentor from the suggestions below!`}</Text>
      <Grid gap={10} mt={10}>
        {map(item => (
          <Box
            h="20vh"
            bg="gray.50"
            _hover={{ boxShadow: 'dark-lg', rounded: 'md', color: 'white', bg: 'teal.300' }}
            cursor="pointer"
            w={'70%'}
            p="3"
            onClick={() => setShowDetailView(true)}
            m="auto"
            boxShadow="base"
            rounded="md"
          >
            <VStack h="full">
              <Spacer />
              <Image
                src={'https://cdn.pixabay.com/photo/2014/05/07/06/44/cat-339400_1280.jpg'}
                borderRadius="full"
                boxSize="150px"
              />
              <Spacer />
              <Text textStyle="body.1">{`Mr. Kitten the Kitty Cat ${item}`}</Text>
              <HStack>
                <Text>{`Speciality:`}</Text>
                <Text textStyle="body.2">{'Meowing, Cuteness'}</Text>
              </HStack>
            </VStack>
          </Box>
        ))(items)}
      </Grid>
    </Box>
  )
}

export default Recommendation
