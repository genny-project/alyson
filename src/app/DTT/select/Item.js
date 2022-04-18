import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import { compose, includes } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bufferDropdownOption } from 'redux/app'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { selectBufferDropdownOptions } from 'redux/app/selectors'

const Item = ({ option, idx, onSelectChange, focus, selected, maxW, setInput, setOpen }) => {
  const focused = focus === idx
  const dispatch = useDispatch()
  const setBufferDropdownOption = compose(dispatch, bufferDropdownOption)
  const getBufferedDropdownOptions = useSelector(selectBufferDropdownOptions)

  const onClick = () => {
    setBufferDropdownOption([...getBufferedDropdownOptions, option])
    onSelectChange(option.value)
    setInput('')
    setOpen(false)
  }

  return (
    <Flex
      direction="row"
      align="center"
      test-id={option.value}
      id={idx + 'item'}
      tabIndex={idx + 1}
      onKeyPress={e => {
        if (e.key === 'Enter') onSelectChange(option.value)
      }}
      onClick={onClick}
      cursor="pointer"
      key={option.value}
      bg={idx % 2 ? 'blackAlpha.50' : ''}
      fontWeight={focused ? 'semibold' : 'normal'}
      // h="2rem"
      maxW={maxW}
      px="3"
      color={includes(option.value, selected) ? 'green.400' : 'text.light'}
      _hover={{
        background: 'green.400',
        color: 'text.dark',
      }}
      _active={{
        color: 'green.400',
      }}
    >
      <Box maxW={`calc(${maxW} - 2rem)`}>
        <Text textOverflow="clip" noOfLines="1" my="1">
          {option.label}
        </Text>
      </Box>

      <Spacer />
      {focus === idx && <Text>⏎</Text>}
      {includes(option.value, selected) ? <FontAwesomeIcon icon={faCheck} color="green" /> : null}
    </Flex>
  )
}

export default Item
