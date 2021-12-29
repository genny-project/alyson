import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { useEffect, useRef, useState } from 'react'

import { Text } from '@chakra-ui/layout'
import defaultTimeZones from 'utils/helpers/time-zone.json'
import { fromLatLng } from 'utils/helpers/timezone_magic/get-timezone-name'

let places

const PlacesAutocomplete = ({ onSelect, questionCode }) => {
  const inputRef = useRef(null)
  const [input, setInput] = useState('')

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
      <Text m="1">What is a city inside your preferred timezone?</Text>
      <InputGroup>
        <Input
          test-id={questionCode}
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <InputRightAddon>
          <Menu>
            <MenuButton test-id={questionCode}>Select From A List</MenuButton>
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
