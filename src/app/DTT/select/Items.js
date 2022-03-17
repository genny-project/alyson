import { HStack, Text, VStack } from '@chakra-ui/layout'
import { dec, inc, isEmpty } from 'ramda'
import { useEffect, useRef, useState } from 'react'
import { useIsMobile, useMobileValue } from 'utils/hooks'

import Card from 'app/layouts/components/card'
import { CircularProgress } from '@chakra-ui/progress'
import Item from './Item'
import { useHotkeys } from 'react-hotkeys-hook'
import { useOutsideClick } from '@chakra-ui/hooks'

const ItemsForAutocomplete = ({
  filteredOptions = [],
  onSelectChange,
  userType,
  selected,
  createNew,
  input,
  searching,
  setOpen,
  setInput,
}) => {
  const [focus, setFocus] = useState(0)

  const ref = useRef()

  const isMobile = useIsMobile()

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
    if (typeof focus === 'number' && filteredOptions.length) {
      if (focus < 0) setFocus(0)
      if (focus > filteredOptions.length - 1) setFocus(filteredOptions.length - 1)
    }
  }, [filteredOptions.length, focus])

  useOutsideClick({
    ref,
    handler: () => !isMobile && setOpen(false),
  })
  const maxW = useMobileValue(['', '25vw'])
  return (
    <Card
      overflow="hidden"
      zIndex="modal"
      position="absolute"
      variant="card3"
      w={'100%'}
      maxW={maxW}
      p={0}
      onMouseEnter={() => setFocus(null)}
      onMouseLeave={() => setFocus(0)}
    >
      <VStack
        ref={ref}
        borderRadius="md"
        spacing={0}
        align="stretch"
        overflowY="scroll"
        maxH="20rem"
      >
        {filteredOptions.length ? (
          filteredOptions.map((option, idx) => (
            <Item
              option={option}
              idx={idx}
              key={option.value}
              onSelectChange={onSelectChange}
              focus={focus}
              selected={selected}
              maxW={maxW}
              setInput={setInput}
              setOpen={setOpen}
            />
          ))
        ) : searching ? null : (userType === 'AGENT' || userType === 'ADMIN') && isEmpty(input) ? (
          <Text
            p="3"
            cursor="pointer"
            _hover={{ color: 'teal' }}
            onClick={createNew}
            textStyle="body.3"
          >{`Not found, create "${input}"?`}</Text>
        ) : (
          <Text p="3" textStyle="tail.3">
            {`Searching ...`}
          </Text>
        )}

        {searching && (
          <HStack p="3">
            <CircularProgress size={4} isIndeterminate />
            <Text textStyle="tail.3">{`Searching ${input}`}</Text>
          </HStack>
        )}
      </VStack>
    </Card>
  )
}

export default ItemsForAutocomplete
