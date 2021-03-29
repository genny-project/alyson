import { useSelector } from 'react-redux'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import icons from 'utils/icons'

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
        <IconButton
          colorScheme="primary"
          variant="solid"
          icon={<FontAwesomeIcon icon={icons[childCode]} />}
        />

        <Text textStyle="body1" _hover={{ opacity: 1.0 }} opacity="0.8">
          {name}
        </Text>
      </HStack>
    )
  return (
    <Menu>
      <MenuButton test-id={childCode} colorScheme="primary">
        <HStack spacing="4" role="group" p="2" test-id={childCode} onClick={onClick} as="button">
          <IconButton
            colorScheme="primary"
            variant="solid"
            icon={<FontAwesomeIcon icon={icons[childCode]} />}
          />
          <Text textStyle="body1" _hover={{ opacity: 1.0 }} opacity="0.8">
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
  )
}

export default ChildButton
