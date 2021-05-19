import { HStack, Text, VStack } from '@chakra-ui/layout'
// import { CircularProgress } from '@chakra-ui/progress'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Card from 'app/layouts/components/card'
import { dec, inc, includes } from 'ramda'
import { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const ItemsForAutocomplete = ({
  filteredOptions = [],
  onSelectChange,
  userType,
  selected,
  createNew,
  input,
  searching,
}) => {
  const [focus, setFocus] = useState(0)

  useHotkeys('down', () => setFocus(inc), { enableOnTags: ['INPUT'] })
  useHotkeys('up', () => setFocus(dec), { enableOnTags: ['INPUT'] })
  useHotkeys(
    'enter',
    () => {
      if (filteredOptions[focus]) onSelectChange(filteredOptions[focus].value)
    },
    { enableOnTags: ['INPUT'] },
    [focus, filteredOptions],
  )

  useEffect(() => {
    if (typeof focus === 'number') {
      if (focus < 0) setFocus(0)
      if (focus > filteredOptions.length - 1) setFocus(filteredOptions.length - 1)
    }
  }, [filteredOptions.length, focus])

  return (
    <Card
      overflow="hidden"
      zIndex="modal"
      position="absolute"
      variant="card3"
      w={'100%'}
      maxW="25vw"
      p={0}
    >
      <VStack borderRadius="md" spacing={0} align="stretch" overflowY="scroll" maxH="20rem">
        {filteredOptions.length ? (
          filteredOptions.map((option, idx) => (
            <HStack
              id={idx + 'item'}
              tabIndex={idx + 1}
              onKeyPress={e => {
                if (e.key === 'Enter') onSelectChange(option.value)
              }}
              onClick={() => onSelectChange(option.value)}
              cursor="pointer"
              key={option.value}
              py="1.5"
              px="3"
              bg={idx % 2 ? 'blackAlpha.50' : ''}
              color={focus === idx ? 'teal' : ''}
              _hover={{ color: 'teal' }}
            >
              {includes(option.value, selected) ? (
                <FontAwesomeIcon icon={faCheckCircle} color="green" />
              ) : null}
              <Text textStyle="body.2">{option.label}</Text>
            </HStack>
          ))
        ) : userType === 'AGENT' || userType === 'ADMIN' ? (
          <Text
            p="3"
            cursor="pointer"
            _hover={{ color: 'teal' }}
            onClick={createNew}
            textStyle="body.3"
          >{`Not found, create "${input}"?`}</Text>
        ) : (
          <Text p="3" textStyle="tail.3">
            No options found!
          </Text>
        )}

        {/* {searching && (
          <HStack p="3">
            <CircularProgress size={4} isIndeterminate />
            <Text textStyle="tail.3">{`Searching ${input}`}</Text>
          </HStack>
        )} */}
      </VStack>
    </Card>
  )
}

export default ItemsForAutocomplete
