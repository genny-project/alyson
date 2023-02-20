import { Box, Text, Checkbox, VStack, Divider, Button, HStack, Input } from '@chakra-ui/react'
import { useState } from 'react'

const TodoList = () => {
  const [userInput, setUserInput] = useState()
  const [todoList, setTodoList] = useState([])
  const [checked, setChecked] = useState()

  const handleAddTask = () => {
    setTodoList([...todoList, userInput])
    setUserInput('')
  }

  const handleCheck = individualTask => {
    setChecked()
  }

  return (
    <>
      <Box
        w={'494px'}
        bg={'#EDF8F8'}
        borderRadius={'40px'}
        paddingBlock={'81px'}
        paddingInline={'81px'}
        fontFamily={'PP Neue Montreal'}
      >
        <Text fontSize={'20px'} fontWeight={500} color="#063231">
          {' '}
          TO DO LIST
        </Text>

        <VStack paddingBlock={'20px'}>
          {todoList.map((individualTask, index) => (
            <VStack alignItems={'flex-start'}>
              <HStack>
                <Checkbox
                  fontSize={'8px'}
                  key={index}
                  size="md"
                  spacing={'25px'}
                  onChange={() => handleCheck(individualTask)}
                  isChecked={checked}
                  colorScheme={'green'}
                  borderColor={'#829998'}
                  opacity={checked ? '50%' : '100%'}
                >
                  {individualTask}
                </Checkbox>
              </HStack>
              <Divider width={'351px'} bg="#D3E3E2" />
            </VStack>
          ))}
        </VStack>

        <Button
          _hover={'#EA5024'}
          float={'right'}
          marginRight={'-15px'}
          w={'110px'}
          h={'46px'}
          borderRadius={'50px'}
          marginTop={'-45px'}
          fontSize={'16px'}
          bg="#EA5024"
          color="#FFFFFF"
          onClick={handleAddTask}
        >
          Add task
        </Button>

        <Input
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder={'Enter task here'}
          position={'absolute'}
          size={'sm'}
          w={'351px'}
          borderColor={'black'}
          variant={'flushed'}
        />
      </Box>
    </>
  )
}

export default TodoList
