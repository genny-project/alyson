import { Grid, Box, VStack, Text, Spacer, Image, HStack } from '@chakra-ui/react'
import { map, filter, flatten } from 'ramda'
import { selectCurrentBes } from 'redux/app/selectors.ts'
import { useSelector } from 'react-redux'
import Attribute from 'app/BE/attribute'

const Recommendation = ({ setShowDetailView, setCurrentMentor }) => {
  const currentBes = useSelector(selectCurrentBes)
  const filteredMentors = flatten(
    map(({ baseEntityAttributes }) =>
      filter(
        ({ attributeCode, valueBoolean }) =>
          attributeCode === 'PRI_IS_MENTOR' && valueBoolean === true,
      )(baseEntityAttributes),
    )(currentBes),
  )
  const mentors = map(({ baseEntityCode }) => baseEntityCode)(filteredMentors)

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
        {map(mentor => (
          <Box
            h="20vh"
            bg="gray.50"
            _hover={{ boxShadow: 'dark-lg', rounded: 'md', color: 'white', bg: 'teal.300' }}
            cursor="pointer"
            w={'70%'}
            p="3"
            onClick={() => {
              setShowDetailView(true)
              setCurrentMentor(mentor)
            }}
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
              <Attribute config={{ textStyle: 'head.2' }} code={mentor} attribute="PRI_NAME" />
              <HStack>
                <Text>{`STATUS:`}</Text>
                <Attribute config={{ textStyle: 'body.2' }} code={mentor} attribute="PRI_STATUS" />
              </HStack>
            </VStack>
          </Box>
        ))(mentors)}
      </Grid>
    </Box>
  )
}

export default Recommendation
