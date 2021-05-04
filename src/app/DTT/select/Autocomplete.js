import { useOutsideClick } from '@chakra-ui/hooks'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, HStack, Text, VStack, Wrap, WrapItem } from '@chakra-ui/layout'
import { faAngleDown, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chip from 'app/layouts/components/chip'
import { append, compose, filter, find, includes, not, prop, propEq, replace, toLower } from 'ramda'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import { onlyValue } from './get-value'
import { useMobileValue } from 'utils/hooks'
import Card from 'app/layouts/components/card'

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

  const width = useMobileValue(['100%', '25vw'])

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
                <Chip onClick={() => onSelectChange(item)} p="2">
                  {renderLabel(item)}
                </Chip>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      ) : null}
      <InputGroup w={width}>
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
        <Card variant="card3" maxH="20rem" overflowY="scroll" w={width}>
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
                  <Text textStyle="body.2">{option.label}</Text>
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
        </Card>
      )}
    </Box>
  )
}

export default Autocomplete
