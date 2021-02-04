import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Menu, MenuList, MenuButton, MenuItem, MenuGroup } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import Action from './Action'

const ContextMenu = ({ parentCode, code, children, actions }) => {
  const baseEntityName = useSelector(selectCode(code, 'PRI_NAME'))

  const [menu, setMenu] = useState(null)

  const handleContextMenu = e => {
    e.preventDefault()
    setMenu(
      menu === null
        ? {
            mouseX: e.clientX - 2,
            mouseY: e.clientY - 4,
          }
        : null,
    )
  }

  const handleClose = () => {
    setMenu(null)
  }

  return (
    <div style={{ cursor: 'context-menu' }} onContextMenu={handleContextMenu}>
      <Menu isLazy isOpen={menu !== null} onClose={handleClose}>
        <MenuButton>{children}</MenuButton>
        <MenuList>
          <MenuGroup title={baseEntityName?.value}>
            {actions.map(action => (
              <Action key={action} targetCode={code} code={action} parentCode={parentCode} />
            ))}
          </MenuGroup>
        </MenuList>
      </Menu>
    </div>
  )
}

export default ContextMenu
