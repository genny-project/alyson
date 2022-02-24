import { Box, HStack, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { useSelector } from 'react-redux'

const ChildButton = ({ questionCode, childCode, onClick, sideBarButtons }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  if (!data) return null

  const { name, childAsks } = data

  const handleClick = () => {
    sendAskClick(childCode, childCode)
  }

  if (!childAsks)
    return (
      <VStack spacing="4" role="group" p="2" test-id={childCode} onClick={handleClick} as="button">
        <Box
          background="primary.500"
          borderRadius="0.5rem"
          color="white"
          p={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <FontAwesomeIcon icon={icons[childCode]} size="2x" color="#AAE3E2" />
        </Box>

        <Text color="#BDC5CD" fontSize="12px" fontWeight="400">
          {name}
        </Text>
      </VStack>
    )
  return (
    <Menu>
      <MenuButton test-id={childCode}>
        <VStack spacing="4" role="group" p="2" test-id={childCode} onClick={onClick}>
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

          <Text color="#BDC5CD" fontSize="12px" fontWeight="400">
            {name}
          </Text>

          {!sideBarButtons && <FontAwesomeIcon icon={faAngleDown} />}
        </VStack>
      </MenuButton>

      <MenuList>
        {childAsks.map(childAsk => (
          <MenuItem
            onClick={() => {
              sendAskClick(childAsk.questionCode, childAsk.questionCode)
            }}
            test-id={childAsk.questionCode}
            key={childAsk.questionCode}
          >
            {childAsk.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default ChildButton
