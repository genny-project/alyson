import { Text, Box, Wrap, WrapItem, HStack } from '@chakra-ui/react'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EventsCard from 'app/PCM/components/events-card'
import TodoList from 'app/PCM/components/todo-list'

const EventsPanel = () => {
  return (
    <>
      <Box
        bg={'#CAEAE9'}
        minW={'100vw'}
        minHeight={'100vh'}
        marginBottom={'-1.5rem'}
        marginRight={'-4rem'}
        marginLeft={'-5.5rem'}
        marginTop={'-1rem'}
        borderRadius={'1.6rem'}
        paddingBlock={'2rem'}
        paddingInline={'4rem'}
      >
        <Wrap spacing={'2.25rem'} alignItems={'center'}>
          <WrapItem>
            <TodoList />
          </WrapItem>
          <WrapItem>
            <Box
              bg={'#FFFFFF'}
              w={'33.5rem'}
              h={'17rem'}
              paddingBlock={'2rem'}
              paddingInline={'2.25rem'}
              borderRadius={'2.5rem'}
            >
              <Text fontSize={'20px'} marginBottom={'1rem'}>
                {' '}
                Next Events
              </Text>
              <HStack spacing={'1.25rem'}>
                <EventsCard />
              </HStack>
              <HStack paddingBlock={'1.5rem'} justifyContent={'flex-end'}>
                <Text color={'#EA5024'}> View all events </Text>
                <FontAwesomeIcon icon={faArrowRight} color={'#EA5024'} />
              </HStack>
            </Box>
          </WrapItem>
        </Wrap>
      </Box>
    </>
  )
}

export default EventsPanel
