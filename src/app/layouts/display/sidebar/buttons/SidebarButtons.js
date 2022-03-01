import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  Avatar,
} from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { useSelector } from 'react-redux'
import useApi from 'api'

const SidebarButtons = ({ questionCode, childCode, onClick, iconId }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  const { getImageSrc } = useApi()
  const src = getImageSrc(iconId)

  if (!data) return null

  const { name, childAsks } = data

  const handleClick = () => {
    sendAskClick(childCode, childCode)
  }

  if (!childAsks)
    return (
      <VStack spacing="4" role="group" p="2" test-id={childCode} onClick={handleClick} as="button">
        <Box display="flex" alignItems="center" justifyContent="center">
          {iconId ? (
            <Avatar
              cursor="pointer"
              src={src}
              h="40px"
              w="40px"
              borderRadius="0"
              objectFit="contain"
            />
          ) : (
            <FontAwesomeIcon icon={icons[childCode]} size="2x" color="#AAE3E2" />
          )}
        </Box>
        <Text color="#BDC5CD" fontSize="12px" fontWeight="400">
          {name}
        </Text>
      </VStack>
    )
  return (
    <Menu placement="right-start">
      <MenuButton test-id={childCode}>
        <VStack spacing="4" role="group" test-id={childCode} onClick={onClick}>
          <Box display="flex" alignItems="center" justifyContent="center">
            {iconId ? (
              <Avatar
                cursor="pointer"
                src={src}
                h="40px"
                w="40px"
                borderRadius="0"
                objectFit="contain"
              />
            ) : (
              <FontAwesomeIcon icon={icons[childCode]} size="2x" color="#AAE3E2" />
            )}
          </Box>
          <HStack>
            <Text color="#BDC5CD" fontSize="12px" fontWeight="400">
              {name}
            </Text>
            <FontAwesomeIcon icon={faAngleDown} color="#BDC5CD" />
          </HStack>
        </VStack>
      </MenuButton>

      <MenuList minW="350px" margin="40px 0px 0px 12px">
        {childAsks.map(childAsk => (
          <MenuItem
            onClick={() => {
              sendAskClick(childAsk.questionCode, childAsk.questionCode)
            }}
            test-id={childAsk.questionCode}
            key={childAsk.questionCode}
            _focus={{ bg: '#3AB8B5', color: '#ffffff' }}
            fontSize="14px"
            fontWeight="400"
          >
            {childAsk.name}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}

export default SidebarButtons
