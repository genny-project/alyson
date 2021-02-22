import { Menu, MenuButton, MenuList } from '@chakra-ui/react'
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
            <Action parentCode={sbeCode} code={action} targetCode={beCode} key={action} mobile />
          ))(actions)}
      </MenuList>
    </Menu>
  )
}

export default HeaderActions
