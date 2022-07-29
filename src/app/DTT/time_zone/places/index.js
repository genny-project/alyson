import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { useEffect, useRef, useState } from 'react'

import { Text } from '@chakra-ui/layout'
import defaultTimeZones from 'utils/helpers/time-zone.json'
import { equals } from 'ramda'
import { fromLatLng } from 'utils/helpers/timezone_magic/get-timezone-name'
import { lojing } from 'utils/constants'
import { useTheme } from '@chakra-ui/react'

let places

const PlacesAutocomplete = ({ onSelect, questionCode, clientId }) => {
  const inputRef = useRef(null)
  const [input, setInput] = useState('')

  const theme = useTheme()

  const fieldBackgroundColor = equals(clientId)(lojing)
    ? 'product.gray'
    : theme.colors.background.light
  const fieldBorderColor = equals(clientId)(lojing) ? 'product.gray' : theme.colors.gray['600']
  const fieldHoverBorderColor = equals(clientId)(lojing) ? 'product.gray' : 'product.secondary'
  const fieldTextColor = 'product.gray700'

  const labelTextColor = equals(clientId)(lojing) ? 'gray.600' : 'product.gray700'
  const borderRadius = equals(clientId)(lojing) ? 'calc(0.25rem - 1px)' : '0.5rem'

  useEffect(() => {
    if (inputRef) {
      places = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
        fields: ['geometry'],
      })
      window.google.maps.event.addListener(places, 'place_changed', async () => {
        const { geometry } = places.getPlace() || {}
        const { location } = geometry || {}
        const timezone = await fromLatLng({
          lat: location?.lat(),
          lng: location?.lng(),
        })
        onSelect(timezone?.timeZoneId)
      })
    }
  }, [onSelect])

  return (
    <div>
      <Text color={labelTextColor} m="1">
        What is a city inside your preferred timezone?
      </Text>

      <InputGroup
        bg={fieldBackgroundColor}
        borderRadius={borderRadius}
        borderWidth="1px"
        borderStyle="solid"
        borderColor={fieldBorderColor}
        overflow={'hidden'}
        role="group"
        _hover={{
          borderColor: fieldHoverBorderColor,
          boxShadow: 'lg',
        }}
        _focusVisible={{
          borderColor: 'product.secondary',
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
        _focusWithin={{
          borderColor: 'product.secondary',
          boxShadow: 'initial',
        }}
      >
        <Input
          test-id={questionCode}
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          w="full"
          h={'auto'}
          paddingBlock={3}
          paddingInlineEnd={6}
          paddingInlineStart={0}
          border={0}
          fontSize={'sm'}
          fontWeight={'medium'}
          color={fieldTextColor}
          role="peer"
          _focusVisible={{
            border: '0',
          }}
          _focus={{
            border: '0',
          }}
        />
        <InputRightAddon>
          <Menu>
            <MenuButton test-id={`${questionCode}_LISTS`}>Select From A List</MenuButton>
            <MenuList maxH="20rem" overflowY="scroll">
              {Object.entries(defaultTimeZones).map(([key, value]) => (
                <MenuItem
                  test-id={value}
                  key={key}
                  onClick={() => onSelect(value)}
                >{`${key}: ${value}`}</MenuItem>
              ))}
            </MenuList>
          </Menu>
        </InputRightAddon>
      </InputGroup>
    </div>
  )
}

export default PlacesAutocomplete
