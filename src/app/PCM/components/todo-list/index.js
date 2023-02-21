import { Box, Text, Checkbox, VStack, Divider, Button, HStack, Input } from '@chakra-ui/react'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

import { isNullOrUndefinedOrEmpty } from 'utils/helpers/is-null-or-undefined'

const TodoList = () => {
  const [userInput, setUserInput] = useState(null)
  const [todoList, setTodoList] = useState([])

  const errorMessage = 'Please enter valid text.'
  const isInvalid = isNullOrUndefinedOrEmpty(userInput)

  const handleAddTask = () => {
    const userInputObject = { name: userInput, isChecked: false }
    setTodoList([...todoList, userInputObject])
    setUserInput('')
  }

  const handleDeleteTask = indexToBeDeleted => {
    const newTodoList = todoList.filter((__, index) => index !== indexToBeDeleted)
    setTodoList(newTodoList)
  }

  const handleOnCheckChange = taskIndex => {
    let todoListCopy = [...todoList]
    const indexedObject = todoListCopy[taskIndex]
    const toggledIsChecked = !indexedObject.isChecked
    const newIndexedObject = { ...indexedObject, isChecked: toggledIsChecked }
    todoListCopy[taskIndex] = newIndexedObject
    setTodoList(todoListCopy)
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
        <Text fontSize={'20px'} fontWeight={500} color="#063231" paddingBlock={'12px'}>
          TO DO LIST
        </Text>

        {todoList.map(({ name, isChecked }, index) => (
          <VStack alignItems={'flex-start'} paddingBlock={'6px'}>
            <HStack justifyContent={'space-between'} w="full">
              <Checkbox
                fontSize={'8px'}
                key={index}
                size="md"
                spacing={'25px'}
                onChange={() => handleOnCheckChange(index)}
                opacity={isChecked ? '50%' : '100%'}
                colorScheme={'green'}
                borderColor={'#829998'}
              >
                {name}
              </Checkbox>
              <FontAwesomeIcon
                icon={faTrash}
                size={'xs'}
                cursor={'pointer'}
                onClick={() => handleDeleteTask(index)}
              />
            </HStack>
            <Divider width={'351px'} borderColor="#D3E3E2" />
          </VStack>
        ))}
        <Input
          value={userInput}
          onChange={event => setUserInput(event.target.value)}
          placeholder={'Enter task here'}
          size={'sm'}
          borderColor={'black'}
          width={'253px'}
          variant={'flushed'}
        />
        <Button
          _hover={'#EA5024'}
          float={'right'}
          marginRight={'-30px'}
          w={'110px'}
          h={'46px'}
          marginTop={'-25px'}
          borderRadius={'50px'}
          fontSize={'16px'}
          disabled={isInvalid ? true : false}
          bg="#EA5024"
          color="#FFFFFF"
          onClick={handleAddTask}
        >
          Add task
        </Button>
        {isInvalid ? (
          <VStack alignItems="start">
            <Text color={'red'} fontSize={'12px'}>
              {errorMessage}
            </Text>
          </VStack>
        ) : null}
      </Box>
    </>
  )
}

export default TodoList
