import { Box, Text, Wrap, WrapItem } from '@chakra-ui/layout'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { append, compose, filter, find, includes, not, prop, propEq, replace, toLower } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

import Chip from 'app/layouts/components/chip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ItemsForAutocomplete from './Items'
import { bufferDropdownOption } from 'redux/app'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import getUserType from 'utils/helpers/get-user-type'
import { selectBufferDropdownOptions } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import { useIsFieldNotEmpty } from 'utils/contexts/IsFieldNotEmptyContext'
import { useMobileValue } from 'utils/hooks'
import { getUniqueValuesFromTwoArrays } from 'utils/functionals'

const Autocomplete = ({
  multiple,
  questionCode,
  defaultValue,
  options,
  onChange,
  placeholder,
  ddEvent,
  groupCode,
}) => {
  const selected = defaultValue
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const ref = useRef()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const setBufferDropdownOption = compose(dispatch, bufferDropdownOption)
  const { dispatchFieldMessage } = useIsFieldNotEmpty()

  const getBufferedDropdownOptions = useSelector(selectBufferDropdownOptions)

  const user = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(user)))

  const focusInput = () => {
    if (inputRef?.current?.focus) inputRef.current.focus()
  }
  const toggleOpen = () => {
    setBufferDropdownOption(getUniqueValuesFromTwoArrays(getBufferedDropdownOptions)(options))
    setOpen(not)
  }

  var [items, setItems] = useState([])

  const onInputChange = ({ target: { value } }) => {
    setSearching(true)
    ddEvent(value)
    setOpen(!!value)
    setInput(value)
    dispatchFieldMessage({ payload: questionCode })
  }

  const onSelectChange = option => {
    const newSelected = includes(option, selected)
      ? filter(item => item !== option, selected)
      : append(option, selected)

    onChange(newSelected)

    if (!multiple) setOpen(false)
    var i = renderLabel(option)

    if (i) {
      if (multiple) {
        setItems([...items, i])
      } else {
        setItems([i])
      }
    }

    dispatchFieldMessage({ payload: questionCode })
  }

  const createNew = () => {
    onSelectChange(`NEW_${replace(' ', '_', input)}`)
  }

  const optionsIncludingBufferedOptions = [...getBufferedDropdownOptions, ...options]

  const renderLabel = item => {
    return compose(prop('label'), find(propEq('value', item)))(optionsIncludingBufferedOptions)
  }

  const filteredOptions = options.filter(option =>
    includes(toLower(input), toLower(option.label || '')),
  )

  useEffect(() => {
    if (searching) setSearching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const maxW = useMobileValue(['', '25vw'])

  const dropDownRef = useRef()

  const checkDropdownOpen = e => {
    if (dropDownRef.current.contains(e.target)) {
      return
    }
    setOpen(false)
  }

  useEffect(() => {
    document.addEventListener('mousedown', checkDropdownOpen)
    return () => {
      document.removeEventListener('mousedown', checkDropdownOpen)
    }
  }, [])

  var renderOptions = items.map(item => (
    <WrapItem key={item}>
      <Chip id={questionCode} test-id={item} onClick={() => onSelectChange(item)} p="2">
        <Text>{item}</Text>
      </Chip>
    </WrapItem>
  ))

  if (selected.length > 0 && items.length !== 0) {
    setItems([])
    renderOptions = items.map(item => (
      <WrapItem key={item}>
        <Chip id={questionCode} test-id={item} onClick={() => onSelectChange(item)} p="2">
          <Text>{renderLabel(item)}</Text>
        </Chip>
      </WrapItem>
    ))
  } else {
    if (items.length === 0) {
      renderOptions = selected.map(item => (
        <WrapItem key={item}>
          <Chip id={questionCode} test-id={item} onClick={() => onSelectChange(item)} p="2">
            <Text>{renderLabel(item)}</Text>
          </Chip>
        </WrapItem>
      ))
    }
  }

  return (
    <Box
      onFocus={() => {
        ddEvent('')
        if (!options.length) {
          setSearching('')
        }
      }}
      ref={ref}
      w="full"
      maxW={maxW}
      test-id={`${questionCode}-div`}
    >
      <Box pb="1">
        <Wrap w="full" maxW={maxW}>
          {renderOptions}
        </Wrap>
      </Box>
      <Box id={questionCode} ref={dropDownRef}>
        <InputGroup display={!multiple && selected.length ? 'none' : 'block'} w="full">
          <Input
            id={questionCode}
            test-id={questionCode}
            onKeyDown={e => {
              if (e.key === 'ArrowDown' && !open) setOpen(true)
            }}
            ref={inputRef}
            onClick={toggleOpen}
            onChange={onInputChange}
            value={input}
            placeholder={placeholder}
            autoComplete="off"
            paddingBlock={3}
            paddingInline={5}
            fontWeight={'medium'}
            borderColor={'gray.700'}
            _hover={{
              borderColor: 'green.500',
              boxShadow: 'lg',
            }}
            _focusVisible={{
              borderColor: 'green.500',
              boxShadow: 'initial',
            }}
            _invalid={{
              background: 'error.50',
              borderColor: 'error.500',
              color: 'error.500',
            }}
            _disabled={{
              borderColor: 'gray.300',
              background: 'gray.100',
            }}
          />
          <InputRightElement>
            <Box
              cursor="pointer"
              _hover={{ color: 'teal' }}
              transform={open ? 'rotate(180deg)' : 'rotate(0deg)'}
              transition="all 0.3s ease"
            >
              <FontAwesomeIcon
                icon={faAngleDown}
                onClick={() => {
                  toggleOpen()
                  !open && ddEvent('')
                }}
              />
            </Box>
          </InputRightElement>
        </InputGroup>
        <Box test-id={groupCode} display={open ? 'block' : 'none'}>
          {open && (
            <ItemsForAutocomplete
              {...{
                focusInput,
                onSelectChange,
                userType,
                selected,
                createNew,
                input,
                searching,
                filteredOptions,
                setOpen,
                setInput,
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Autocomplete
