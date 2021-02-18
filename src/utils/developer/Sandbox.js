/* eslint-disable */
import React from 'react'

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

const App = () => (
  <ChakraProvider resetCSS>
    <Grid gap={6}>
      <Box bg="#ffffff" borderRadius="lg" border="1px solid lightgrey" overflow="hidden">
        <Box p={5} pb={8} m={8}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            mb={1}
            flexDirection="row"
          >
            <Avatar size="xl" mr={8} />
            <Text fontWeight="bold" fontSize="2xl">
              John Smith
            </Text>
          </Box>
          <Divider borderColor="blackAlpha.500" mt={4} mb={4} />
          <Box display="flex" alignItems="center" flexDirection="row" justifyContent="flex-start">
            <StarIcon color="gray.700" m={4} />
            <Text fontWeight="bold" m={4}>
              Contact Details
            </Text>
          </Box>
          <Box m={8}>
            <Text fontSize="sm" mb={3}>
              John Smith
            </Text>
          </Box>
          <Box m={8}>
            <Text fontSize="sm" mb={3}>
              1800123456
            </Text>
          </Box>
          <Box m={8}>
            <Text fontSize="sm" mb={3}>
              johnsmith@gmail.com
            </Text>
          </Box>
          <Box m={8}>
            <Text fontSize="sm" mb={3}>
              317-353 Spencer Street. West Melbourne. VIC. 3003
            </Text>
          </Box>
        </Box>
      </Box>
    </Grid>
  </ChakraProvider>
)

export default App
