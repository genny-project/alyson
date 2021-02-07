import { useSelector } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

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
      <MenuButton test-id={childCode} size={size} colorScheme="teal" as={Button}>
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
