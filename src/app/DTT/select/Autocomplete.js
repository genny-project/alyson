import { useOutsideClick } from '@chakra-ui/hooks'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Badge, Box, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import { faAngleDown, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { append, compose, filter, find, includes, not, prop, propEq, replace, toLower } from 'ramda'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import { onlyValue } from './get-value'

const Autocomplete = ({ questionCode, defaultValue, options, onChange, placeholder }) => {
  const selected = onlyValue(defaultValue || [])
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef()

  const user = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(user)))

  const toggleOpen = () => setOpen(not)
  const onInputChange = ({ target: { value } }) => {
    setOpen(!!value)
    setInput(value)
  }
  const onSelectChange = option => {
    const newSelected = includes(option, selected)
      ? filter(item => item !== option, selected)
      : append(option, selected)

    onChange(newSelected)
  }

  const onBlur = () => {
    setOpen(false)
    setInput('')
  }

  const createNew = () => {
    onSelectChange(`NEW_${replace(' ', '_', input)}`)
  }

  const renderLabel = item => compose(prop('label'), find(propEq('value', item)))(options)

  const filteredOptions = options.filter(option =>
    includes(toLower(input), toLower(option.label || '')),
  )

  useOutsideClick({
    ref,
    handler: onBlur,
  })

  return (
    <Box ref={ref} test-id={questionCode}>
      {selected.length ? (
        <Box pb="2">
          <Wrap maxW="50vw">
            {selected.map(item => (
              <WrapItem key={item}>
                <Badge
                  cursor="pointer"
                  onClick={() => onSelectChange(item)}
                  p="2"
                  colorScheme="green"
                >
                  <HStack>
                    <FontAwesomeIcon icon={faTimes} />
                    <Text>{renderLabel(item)}</Text>
                  </HStack>
                </Badge>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      ) : null}
      <InputGroup>
        <Input
          onClick={toggleOpen}
          onChange={onInputChange}
          value={input}
          placeholder={placeholder}
        />
        <InputRightElement>
          <Box
            cursor="pointer"
            _hover={{ color: 'teal' }}
            transform={open ? 'rotate(180deg)' : 'rotate(0deg)'}
            transition="all 0.3s ease"
          >
            <FontAwesomeIcon icon={faAngleDown} onClick={toggleOpen} />
          </Box>
        </InputRightElement>
      </InputGroup>
      {open && (
        <Box borderRadius="md" p="3" shadow="md">
          <VStack align="stretch">
            {filteredOptions.length ? (
              filteredOptions.map(option => (
                <HStack
                  _hover={{ color: 'teal' }}
                  onClick={() => onSelectChange(option.value)}
                  cursor="pointer"
                  key={option.value}
                >
                  {includes(option.value, selected) ? (
                    <FontAwesomeIcon icon={faCheckCircle} color="green" />
                  ) : null}
                  <Text>{option.label}</Text>
                </HStack>
              ))
            ) : userType === 'AGENT' || userType === 'ADMIN' ? (
              <Text
                cursor="pointer"
                _hover={{ color: 'teal' }}
                onClick={createNew}
              >{`Not found, create "${input}"?`}</Text>
            ) : (
              <Text>No options found!</Text>
            )}
          </VStack>
        </Box>
      )}
    </Box>
  )
}

export default Autocomplete
