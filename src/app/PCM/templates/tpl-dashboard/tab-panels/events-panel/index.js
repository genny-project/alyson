import { Text, Box, Wrap, WrapItem } from '@chakra-ui/react'
import EventsCard from 'app/PCM/components/events-card'
import TodoList from 'app/PCM/components/todo-list'

const EventsPanel = () => {
  return (
    <>
      <Box
        bg={'#CAEAE9'}
        maxW={'100vw'}
        h={'100vh'}
        marginRight={'-4rem'}
        marginLeft={'-5.5rem'}
        marginTop={'-1rem'}
        borderRadius={'1.6rem'}
        paddingBlock={'2rem'}
        paddingInline={'4rem'}
      >
        <Wrap spacing={'2.25rem'}>
          <WrapItem>
            <TodoList />
          </WrapItem>
          <WrapItem>
            <Box>
              <EventsCard />
            </Box>
          </WrapItem>
        </Wrap>
      </Box>
    </>
  )
}

export default EventsPanel
