import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input'
import { Box, HStack, Text } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { useEffect, useRef, useState } from 'react'

import { useTheme } from '@chakra-ui/react'
import defaultTimeZones from 'utils/helpers/time-zone.json'
import { fromLatLng } from 'utils/helpers/timezone_magic/get-timezone-name'
import useProductColors from 'utils/productColors'

let places

const PlacesAutocomplete = ({ onSelect, questionCode, realm, isProductInternMatch }) => {
  const theme = useTheme()
  const inputRef = useRef(null)
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const {
    fieldBackgroundColor,
    fieldBorderColor,
    fieldHoverBorderColor,
    fieldTextColor,
    labelTextColor,
    borderRadius,
  } = useProductColors()

  useEffect(() => {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }, [onSelect])

  return (
    <div>
      <Box position={'relative'} mt={isFocused ? 6 : 0} transition="all 0.25s ease">
        <HStack
          position={'absolute'}
          zIndex={theme.zIndices.docked}
          top={isFocused ? '-1.5rem' : 3}
          left={0}
          paddingStart={6}
          w="full"
          justifyContent={'space-between'}
          pointerEvents={'none'}
          transition="all 0.25s ease"
        >
          <Text as="label" fontSize={'sm'} fontWeight={'medium'} color={labelTextColor}>
            What is a city inside your preferred timezone?
          </Text>
        </HStack>
      </Box>

      <InputGroup
        onClick={() => setIsFocused(true)}
        role="group"
        w="full"
        h={'auto'}
        bg={isProductInternMatch ? `${realm}.secondary400` : fieldBackgroundColor}
        borderWidth="1px"
        borderStyle="solid"
        borderRadius={isProductInternMatch ? 'lg' : borderRadius}
        borderColor={isProductInternMatch ? `${realm}.primary` : fieldBorderColor}
        fontSize={'sm'}
        fontWeight={'medium'}
        color={isProductInternMatch ? `${realm}.primary` : fieldTextColor}
        cursor={'pointer'}
        _hover={{
          bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
          borderColor: isProductInternMatch ? `${realm}.primary` : fieldHoverBorderColor,
          boxShadow: 'lg',
        }}
        _focusVisible={{
          bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
          borderColor: isProductInternMatch ? `${realm}.primary` : 'product.secondary',
          boxShadow: 'initial',
        }}
        _valid={{
          bg: isProductInternMatch ? `${realm}.primary400` : fieldBackgroundColor,
          borderColor: isProductInternMatch ? `${realm}.primary` : fieldHoverBorderColor,
        }}
        _invalid={{
          background: isProductInternMatch ? `${realm}.secondary400Alpha20` : 'error.50',
          borderColor: isProductInternMatch ? `${realm}.secondary` : 'error.500',
          color: isProductInternMatch ? `${realm}.secondary` : 'error.500',
        }}
        _disabled={{
          borderColor: isProductInternMatch ? `${realm}.primary` : 'gray.300',
          background: isProductInternMatch ? `${realm}.primary` : 'gray.100',
          color: isProductInternMatch ? `${realm}.primary400` : 'inherit',
        }}
      >
        <Input
          test-id={questionCode}
          ref={inputRef}
          value={input}
          onBlur={() => {
            input ? setIsFocused(true) : setIsFocused(false)
          }}
          onChange={e => setInput(e.target.value)}
          w="full"
          h={'auto'}
          paddingBlock={3}
          paddingInline={6}
          border={0}
          fontSize={'sm'}
          fontWeight={'medium'}
          color={isProductInternMatch ? `${realm}.primary` : fieldTextColor}
          placeholder=""
          role="peer"
          _focusVisible={{
            border: '0',
          }}
          _focus={{
            border: '0',
          }}
        />
        <InputRightAddon p={0} border={0} alignSelf={'center'}>
          <Menu>
            <MenuButton
              test-id={`${questionCode}_LISTS`}
              borderRadius={borderRadius}
              fontSize={'sm'}
              fontWeight={'medium'}
              color={theme.colors.text.dark}
              bg={'product.secondary'}
              paddingBlock={3}
              paddingInline={3}
              _groupHover={{
                bg: isProductInternMatch ? `${realm}.primary400` : 'product.secondaryAccent',
              }}
            >
              Select From A List
            </MenuButton>
            <MenuList maxH="20rem" overflowY="scroll">
              {Object.entries(defaultTimeZones).map(([key, value]) => (
                <MenuItem test-id={value} key={key} onClick={() => onSelect(value)}>
                  {`${key}: ${value}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </InputRightAddon>
      </InputGroup>
    </div>
  )
}

export default PlacesAutocomplete
