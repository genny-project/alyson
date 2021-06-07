import { Grid, Box, VStack, Text, Spacer, HStack, useColorModeValue } from '@chakra-ui/react'
import { map } from 'ramda'

import Attribute from 'app/BE/attribute'
import useGetMentorsList from 'app/layouts/dashboard/timeline/helpers/get-mentors-list'

const Recommendation = ({ setShowDetailView, setCurrentMentor }) => {
  const mentors = useGetMentorsList()
  const bg = useColorModeValue('gray.100', 'gray.700')
  const cardsbg = useColorModeValue('#ffffff', 'gray.800')
  const hoverbg = useColorModeValue('teal.300', 'teal.500')

  return (
    <Box w="50vw" h="80vh" spacing={10} textAlign="center" p="5" position="sticky" top="10vh">
      <Text
        textStyle="head.2"
        bg={bg}
        py={5}
      >{`Please select a Mentor from the suggestions below!`}</Text>
      <Spacer />
      <Grid gap={10} bg={bg} overflowY="scroll" h="70vh" mt={5} paddingY={5}>
        {map(mentor => (
          <VStack
            bg={cardsbg}
            _hover={{ boxShadow: 'dark-lg', rounded: 'md', color: 'white', bg: hoverbg }}
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
              <Attribute config={{ size: '2xl' }} code={mentor} attribute="PRI_IMAGE_URL" />
              <Spacer />
              <Attribute config={{ textStyle: 'head.2' }} code={mentor} attribute="PRI_NAME" />
              <HStack>
                <Text>{`Expertise:`}</Text>
                <Attribute
                  config={{ textStyle: 'body.2' }}
                  code={mentor}
                  attribute="PRI_AREA_EXPERTISE"
                />
              </HStack>
            </VStack>
          </VStack>
        ))(mentors)}
      </Grid>
    </Box>
  )
}

export default Recommendation
