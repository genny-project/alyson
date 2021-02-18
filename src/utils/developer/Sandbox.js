/* eslint-disable */
import React, { useState } from 'react'

import {
  ChakraProvider,
  Box,
  Stack,
  Avatar,
  AvatarBadge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
  Switch,
  InputGroup,
  InputRightElement,
  Icon,
  Text,
  Divider,
  Grid,
} from '@chakra-ui/react'
import { EmailIcon, StarIcon } from '@chakra-ui/icons'
import DeveloperConsole from '../developer'

const App = () => {
  const [hover, setHover] = useState(false)

  const toggle = () => setHover(h => !h)

  return (
    <div
      onMouseOver={toggle}
      onMouseLeave={toggle}
      style={{ width: '30rem', height: '30rem', border: '1px solid black' }}
    >
      {`${hover}`}
    </div>
  )
}

export default App
