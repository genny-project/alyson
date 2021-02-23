import { useSelector } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import sendAskClick from 'app/ASKS/utils/send-ask-click'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import makeMotion from 'utils/motion'

const MotionButton = makeMotion(Button)

const ChildButton = ({ questionCode, childCode, size }) => {
  const data = useSelector(selectCode(questionCode, childCode))

  if (!data) return null

  const { name, childAsks } = data

  const onClick = () => sendAskClick(childCode, childCode)

  if (!childAsks)
    return (
      <MotionButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        test-id={childCode}
        size={size}
        colorScheme="blue"
        onClick={onClick}
      >
        {name}
      </MotionButton>
    )
  return (
    <Menu>
      <MenuButton
        test-id={childCode}
        size={size}
        colorScheme="blue"
        rightIcon={<FontAwesomeIcon icon={faCaretDown} />}
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
