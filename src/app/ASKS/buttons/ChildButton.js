import { useSelector } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { Menu, MenuList, MenuItem, MenuButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const ChildButton = ({ questionCode, childCode, size }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  if (!data) return null

  const { name, childAsks } = data

  const onClick = () => sendAskClick(childCode, childCode)

  if (!childAsks)
    return (
      <Button test-id={childCode} size={size} colorScheme="blue" onClick={onClick}>
        {name}
      </Button>
    )
  return (
    <Menu>
      <MenuButton
        test-id={childCode}
        size={size}
        colorScheme="blue"
        rightIcon={<FontAwesomeIcon icon={faAngleDown} />}
        as={Button}
      >
        {name}
      </MenuButton>
      <MenuList>
        {childAsks.map(childAsk => (
          <MenuItem
            onClick={() => sendAskClick(childAsk.questionCode, childAsk.questionCode)}
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
