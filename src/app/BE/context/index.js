import { useSelector } from 'react-redux'
import { Menu, MenuList, MenuButton, MenuGroup, Portal } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import Action from './Action'

const ContextMenu = ({ button, parentCode, code, actions = [] }) => {
  const baseEntityName = useSelector(selectCode(code, 'PRI_NAME'))
  return (
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
  )
}

export default ContextMenu
