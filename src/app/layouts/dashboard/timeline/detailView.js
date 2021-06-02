import { Box, Text, HStack, VStack, Spacer, Image, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import Attribute from 'app/BE/attribute'

const placeholderText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis vestibulum quam, ac scelerisque quam feugiat sit amet. Proin semper eros et odio aliquam vulputate. Duis vitae justo arcu. Vivamus id felis id tellus eleifend porttitor. Suspendisse ac dolor massa. Etiam ullamcorper finibus quam nec consectetur. Nulla dui risus, porttitor a nunc et, feugiat posuere ex. Cras a tincidunt ex. Morbi laoreet, mauris hendrerit luctus commodo, lectus dolor consectetur urna, at ultricies magna risus quis augue Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis vestibulum quam, ac scelerisque quam feugiat sit amet. Proin semper eros et odio aliquam vulputate. Duis vitae justo arcu. Vivamus id felis id tellus eleifend porttitor. Suspendisse ac dolor massa. Etiam ullamcorper finibus quam nec consectetur. Nulla dui risus, porttitor a nunc et, feugiat posuere ex. Cras a tincidunt ex. Morbi laoreet, mauris hendrerit luctus commodo, lectus dolor consectetur urna, at ultricies magna risus quis augue Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis convallis vestibulum quam, ac scelerisque quam feugiat sit amet. Proin semper eros et odio aliquam vulputate. Duis vitae justo arcu. Vivamus id felis id tellus eleifend porttitor. Suspendisse ac dolor massa. Etiam ullamcorper finibus quam nec consectetur. Nulla dui risus, porttitor a nunc et, feugiat posuere ex. Cras a tincidunt ex. Morbi laoreet, mauris hendrerit luctus commodo, lectus dolor consectetur urna, at ultricies magna risus quis augue'

const DetailView = ({ setShowDetailView, currentMentor }) => {
  return (
    <VStack w="50%" bg="gray.100" h="80vh" spacing={10} m={10} p="5" overflowY="scroll">
      <Box w="100%">
        <Button
          onClick={() => setShowDetailView(false)}
          colorScheme="blue"
          variant="solid"
          leftIcon={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
        >{`Mentor Selection`}</Button>
      </Box>
      <VStack>
        <Image
          src={'https://cdn.pixabay.com/photo/2014/05/07/06/44/cat-339400_1280.jpg'}
          borderRadius="full"
          boxSize="150px"
        />
        <Spacer />
        <Attribute config={{ textStyle: 'head.2' }} code={currentMentor} attribute="PRI_NAME" />
      </VStack>
      <VStack boxShadow="base" rounded="md" p="5" w="80%" alignItems="flex-start" bg="gray.50">
        <Text textStyle="head.2">{`Personal Informartion`}</Text>
        <Spacer />
        <HStack>
          <Text>{`Name:`}</Text>
          <Text textStyle="body.3">{'Henry William Dalgliesh Cavill'}</Text>
        </HStack>
        <HStack>
          <Text>{`Phone:`}</Text>
          <Text textStyle="body.3">{'0424121111'}</Text>
        </HStack>
        <HStack>
          <Text>{`Email:`}</Text>
          <Text textStyle="body.3">{'henry@gada.com'}</Text>
        </HStack>
        <HStack>
          <Text>{`Address:`}</Text>
          <Text textStyle="body.3">{'17 hardware lane'}</Text>
        </HStack>
      </VStack>
      <VStack boxShadow="base" rounded="md" p="5" w="80%" alignItems="flex-start" bg="gray.50">
        <Text textStyle="head.2">{`About Me`}</Text>
        <Spacer />
        <HStack>
          <Text>{`Speciality:`}</Text>
          <Text textStyle="body.3">{'Professional Information'}</Text>
        </HStack>
        <HStack>
          <Text>{`Associated Organization:`}</Text>
          <Text textStyle="body.3">{'Outcome Life'}</Text>
        </HStack>
        <HStack>
          <Text>{`Years in service:`}</Text>
          <Text textStyle="body.3">{'7'}</Text>
        </HStack>
      </VStack>
      <VStack boxShadow="base" rounded="md" p="5" w="80%" alignItems="flex-start" bg="gray.50">
        <Text textStyle="head.2">{`What I enjoy`}</Text>
        <Spacer />
        <Text noOfLines={5}>{placeholderText}</Text>
      </VStack>
      <Box w="80%">
        <Button w="full" colorScheme="teal">{`Select`}</Button>
      </Box>
    </VStack>
  )
}

export default DetailView
