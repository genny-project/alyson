import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import ChildMenuItem from './ChildMenuItem'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const AsksMenu = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data) return null

  return (
    <Menu>
      <MenuButton>
        <IconButton icon={<FontAwesomeIcon icon={faCoffee} />} />
      </MenuButton>
      <MenuList>
        {data.map(childCode => (
          <ChildMenuItem key={childCode} questionCode={questionCode} childCode={childCode} />
        ))}
      </MenuList>
    </Menu>
  )
}

export default AsksMenu
