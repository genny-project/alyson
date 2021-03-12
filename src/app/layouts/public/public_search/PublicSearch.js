import { useRef, useState } from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'
import { onSendSearch } from 'vertx'

const ProcessSearch = ({ sbeCode }) => {
  const [searchValue, setSearchValue] = useState('')
  const [focused, setFocused] = useState(false)
  const inputRef = useRef(null)
  const clearRef = useRef(null)

  const handleSubmit = () => {
    onSendSearch({ searchValue, sbeCode, searchType: '!' })
    inputRef.current.blur()
  }

  useHotkeys('ctrl+k, cmd+k', () => {
    setSearchValue('')
    inputRef?.current?.focus()
  })

  useHotkeys('ctrl+c, cmd+c', () => {
    clearRef?.current?.click()
  })

  useHotkeys('enter', () => focused && handleSubmit(), {
    enableOnTags: ['INPUT'],
  })

  return (
    <InputGroup
      size="lg"
      bg="white"
      borderRadius="lg"
      marginLeft="6"
      w="md"
      onSubmit={handleSubmit}
    >
      <InputLeftElement>
        <FontAwesomeIcon icon={faSearch} />
      </InputLeftElement>
      <Input
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
        }}
        ref={inputRef}
        value={searchValue}
        onChange={e => setSearchValue(e.currentTarget.value)}
        placeholder="What are you passionate about?"
      />
    </InputGroup>
  )
}
export default ProcessSearch
