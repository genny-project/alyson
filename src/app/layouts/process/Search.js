import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import {
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Kbd,
  Center,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import { onSendSearch } from 'vertx'

const ProcessSearch = () => {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const processCodes = JSON.stringify(useSelector(selectProcess))

  useHotkeys('cmd+k', () => inputRef?.current?.focus())
  useHotkeys('enter', () => onSendSearch({ searchValue: value, sbeCode: processCodes }), {
    enableOnTags: ['INPUT'],
  })

  return (
    <InputGroup marginLeft="6" w="md">
      <InputLeftAddon>
        <FontAwesomeIcon icon={faSearch} />
      </InputLeftAddon>
      <Input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        placeholder="Search"
      />
      <InputRightAddon>
        {focused ? (
          <Center>
            <Kbd color="gray.500">return</Kbd>
          </Center>
        ) : (
          <HStack spacing="1">
            <Kbd color="gray.500">⌘</Kbd>
            <Kbd color="gray.500">K</Kbd>
          </HStack>
        )}
      </InputRightAddon>
    </InputGroup>
  )
}
export default ProcessSearch
