import { Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { useSelector } from 'react-redux'

const ChildButton = ({ questionCode, childCode, onClick }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  if (!data) return null

  const { name, childAsks } = data

  const handleClick = () => {
    sendAskClick(childCode, childCode)
    onClick()
  }

  if (!childAsks)
    return (
      <HStack spacing="4" role="group" p="2" test-id={childCode} onClick={handleClick} as="button">
        <Box
          background="primary.500"
          borderRadius="0.5rem"
          color="white"
          p={2}
          w="40px"
          h="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FontAwesomeIcon icon={icons[childCode]} />
        </Box>

        <Text textStyle="body.1" _hover={{ opacity: 1.0 }} opacity="0.8">
          {name}
        </Text>
      </HStack>
    )
  return (
    <Box>
      <Menu>
        <MenuButton test-id={childCode}>
          <HStack spacing="4" role="group" p="2" test-id={childCode} onClick={onClick}>
            <Box
              background="primary.500"
              borderRadius="0.5rem"
              color="white"
              p={2}
              w="40px"
              h="40px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FontAwesomeIcon icon={icons[childCode]} />
            </Box>
            <Text textStyle="body.1" _hover={{ opacity: 1.0 }} opacity="0.8">
              {name}
            </Text>
            <FontAwesomeIcon icon={faAngleDown} />
          </HStack>
        </MenuButton>

        <MenuList>
          {childAsks.map(childAsk => (
            <MenuItem
              onClick={() => {
                sendAskClick(childAsk.questionCode, childAsk.questionCode)
                onClick()
              }}
              test-id={childAsk.questionCode}
              key={childAsk.questionCode}
            >
              {childAsk.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default ChildButton
