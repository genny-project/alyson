import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Menu, MenuItem, Divider, Typography } from '@material-ui/core'
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
      {children}
      <Menu
        open={menu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={menu !== null ? { top: menu.mouseY, left: menu.mouseX } : undefined}
      >
        {baseEntityName && (
          <div>
            <MenuItem disabled>
              <Typography variant="h6" color="primary">
                {baseEntityName?.value}
              </Typography>
            </MenuItem>
            <Divider />
          </div>
        )}
        {actions.map(action => (
          <Action key={action} targetCode={code} code={action} parentCode={parentCode} />
        ))}
      </Menu>
    </div>
  )
}

export default ContextMenu
