import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Box, Wrap, WrapItem } from '@chakra-ui/layout'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Chip from 'app/layouts/components/chip'
import { append, compose, filter, find, includes, not, prop, propEq, replace, toLower } from 'ramda'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import { useMobileValue } from 'utils/hooks'
import ItemsForAutocomplete from './Items'

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

  const user = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(user)))

  const focusInput = () => {
    if (inputRef?.current?.focus) inputRef.current.focus()
  }
  const toggleOpen = () => setOpen(not)
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
  }

  const createNew = () => {
    onSelectChange(`NEW_${replace(' ', '_', input)}`)
  }

  const renderLabel = item => compose(prop('label'), find(propEq('value', item)))(options)

  const filteredOptions = options.filter(option =>
    includes(toLower(input), toLower(option.label || '')),
  )

  useEffect(() => {
    if (searching) setSearching(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const maxW = useMobileValue(['', '25vw'])

  return (
    <Box
      onFocus={() => {
        if (!options.length) {
          ddEvent('')
          setSearching('')
        }
      }}
      ref={ref}
      w="full"
      maxW={maxW}
      test-id={`${questionCode}-div`}
    >
      <Box pb="2" display={selected.length ? 'block' : 'none'}>
        <Wrap w="full" maxW={maxW}>
          {selected.map(item => (
            <WrapItem key={item}>
              <Chip test-id={item} onClick={() => onSelectChange(item)} p="2">
                {renderLabel(item)}
              </Chip>
            </WrapItem>
          ))}
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
            <FontAwesomeIcon icon={faAngleDown} onClick={toggleOpen} />
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
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default Autocomplete
