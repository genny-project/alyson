import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import ChildMenuItem from './ChildMenuItem'
import { Menu, MenuButton, MenuList, IconButton, MenuGroup } from '@chakra-ui/react'

const AsksMenu = ({ questionCode, icon }) => {
  const data = useSelector(selectCode(questionCode))
  const title = useSelector(selectCode(questionCode, 'title'))

  if (!data || !data.length) return null

  return (
    <Menu>
      <MenuButton test-id={questionCode} as={IconButton} icon={icon} variant="outline" />
      <MenuList>
        <MenuGroup title={title}>
          {data.map(childCode => (
            <ChildMenuItem key={childCode} questionCode={questionCode} childCode={childCode} />
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default AsksMenu
