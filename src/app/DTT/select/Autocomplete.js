import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, Wrap, WrapItem } from '@chakra-ui/layout'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chip from 'app/layouts/components/chip'
import {
  append,
  compose,
  filter,
  find,
  includes,
  not,
  prop,
  propEq,
  replace,
  toLower,
  reduce,
} from 'ramda'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import { useMobileValue } from 'utils/hooks'
import ItemsForAutocomplete from './Items'
import { selectBufferDropdownOptions } from 'redux/app/selectors'
import { bufferDropdownOption } from 'redux/app'

const Autocomplete = ({
  multiple,
  questionCode,
  defaultValue,
  options,
  onChange,
  placeholder,
  ddEvent,
  groupCode,
  labelOptions,
}) => {
  const selected = defaultValue
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const ref = useRef()
  const inputRef = useRef()
  const dispatch = useDispatch()
  const setBufferDropdownOption = compose(dispatch, bufferDropdownOption)

  const getUniqueValuesFromTwoArrays = firstArray => secondArray =>
    reduce(
      (acc, value) => (!includes(value)(acc) ? acc.concat(value) : acc),
      secondArray,
    )(firstArray)

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
  }

  const onSelectChange = option => {
    const newSelected = includes(option, selected)
      ? filter(item => item !== option, selected)
      : append(option, selected)

    onChange(newSelected)

    if (!multiple) setOpen(false)
    var i = renderLabel(option)

    if (i) {
      setItems([...items, i])
    }
  }

  const createNew = () => {
    onSelectChange(`NEW_${replace(' ', '_', input)}`)
  }

  const optionsIncludingBufferedOptions = [...getBufferedDropdownOptions, ...options]

  const renderLabel = item => {
    return compose(prop('label'), find(propEq('value', item)))(optionsIncludingBufferedOptions)
  }

  const filteredOptions = labelOptions.filter(option =>
    includes(toLower(input), toLower(option.label || '')),
  )

  useEffect(() => {
    if (searching) setSearching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const maxW = useMobileValue(['', '25vw'])

  var renderOptions = items.map(item => (
    <WrapItem key={item}>
      <Chip test-id={item} onClick={() => onSelectChange(item)} p="2">
        {item}
      </Chip>
    </WrapItem>
  ))

  if (selected.length > 0 && items.length !== 0) {
    setItems([])
    renderOptions = items.map(item => (
      <WrapItem key={item}>
        <Chip test-id={item} onClick={() => onSelectChange(item)} p="2">
          {renderLabel(item)}
        </Chip>
      </WrapItem>
    ))
  } else {
    if (items.length === 0) {
      renderOptions = selected.map(item => (
        <WrapItem key={item}>
          <Chip test-id={item} onClick={() => onSelectChange(item)} p="2">
            {renderLabel(item)}
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
      <InputGroup display={!multiple && selected.length ? 'none' : 'block'} w="full">
        <Input
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
  )
}

export default Autocomplete
