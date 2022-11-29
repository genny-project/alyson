import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import { compose, includes } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bufferDropdownOption } from 'redux/app'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
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
      px="3"
      bg={idx % 2 ? 'blackAlpha.50' : ''}
      fontWeight={focused ? 'semibold' : 'normal'}
      _hover={{ fontWeight: 'semibold' }}
      // h="2rem"
      maxW={maxW}
    >
      {includes(option.value, selected) ? (
        <FontAwesomeIcon icon={faCheckCircle} color="green" />
      ) : null}
      <Box maxW={`calc(${maxW} - 2rem)`}>
        <Text textOverflow="clip" noOfLines="10" my="1">
          {option.label}
        </Text>
      </Box>

      <Spacer />
      {focus === idx && <Text>⏎</Text>}
    </Flex>
  )
}

export default Item
