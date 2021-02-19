import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { map } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Action from 'app/BE/action'

const HeaderActions = ({ actions, sbeCode, beCode }) => {
  return (
    <Menu>
      <MenuButton>
        <FontAwesomeIcon size="lg" icon={faEllipsisV} />
      </MenuButton>
      <MenuList>
        {actions &&
          map(action => (
            <MenuItem>
              <Action parentCode={sbeCode} code={action} targetCode={beCode} />
            </MenuItem>
          ))(actions)}
      </MenuList>
    </Menu>
  )
}

export default HeaderActions
