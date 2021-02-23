/* eslint-disable */
import React from 'react'
import { IconButton, HStack, Center } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone, faPhoneAlt, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const Sandbox = () => (
  <Center>
    <HStack m="5">
      <IconButton
        transition="all 0.5s ease"
        color="white"
        bgGradient="linear(to-tr, blue.500,purple.400)"
        _hover={{
          bgGradient: 'linear(to-br, yellow.300, orange.500)',
        }}
        aria-label="copy"
        icon={<FontAwesomeIcon icon={faClone} />}
      />
      <IconButton
        color="white"
        bgGradient="linear(to-tr, blue.500,purple.400)"
        _hover={{
          bgGradient: 'linear(to-br, yellow.300, orange.500)',
        }}
        aria-label="phone"
        icon={<FontAwesomeIcon icon={faPhoneAlt} />}
      />
      <IconButton
        transition="all 0.2s"
        color="white"
        bgGradient="linear(to-tr, blue.500,purple.400)"
        _hover={{
          bgGradient: 'linear(to-br, yellow.300, orange.500)',
        }}
        aria-label="email"
        icon={<FontAwesomeIcon icon={faEnvelope} />}
      />
      <IconButton
        transition="all 0.2s"
        color="white"
        bgGradient="linear(to-tr, blue.500,purple.400)"
        _hover={{
          bgGradient: 'linear(to-br, yellow.300, orange.500)',
        }}
        aria-label="location"
        icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
      />
    </HStack>
  </Center>
)

export default Sandbox
