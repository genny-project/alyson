import { useSelector } from 'react-redux'
import { Menu, MenuList, MenuButton, MenuGroup } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import Action from './Action'

const ContextMenu = ({ button, parentCode, code, actions = [] }) => {
  const baseEntityName = useSelector(selectCode(code, 'PRI_NAME'))
  return (
    <Menu isLazy>
      <MenuButton>{button}</MenuButton>
      <MenuList>
        <MenuGroup title={baseEntityName?.value}>
          {actions.map(action => (
            <Action key={action} targetCode={code} code={action} parentCode={parentCode} />
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default ContextMenu
