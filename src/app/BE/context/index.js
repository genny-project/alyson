import { Menu, MenuButton, MenuGroup, MenuList, Portal, Box } from '@chakra-ui/react'

import Action from './Action'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const ContextMenu = ({ button, parentCode, code, actions = [] }) => {
  const baseEntityName = useSelector(selectCode(code, 'PRI_NAME'))
  return (
    <Box>
      <Menu isLazy>
        <MenuButton test-id={`${code}-actions`}>{button}</MenuButton>
        <Portal>
          <MenuList>
            <MenuGroup title={baseEntityName?.value}>
              {actions.map(action => (
                <Action key={action} targetCode={code} code={action} parentCode={parentCode} />
              ))}
            </MenuGroup>
          </MenuList>
        </Portal>
      </Menu>
    </Box>
  )
}

export default ContextMenu
