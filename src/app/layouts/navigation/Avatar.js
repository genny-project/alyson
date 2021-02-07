import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { Menu, MenuButton, MenuList, Avatar, MenuGroup, Flex, Spacer } from '@chakra-ui/react'
import ChildMenuItem from 'app/ASKS/menu/ChildMenuItem'
import ColorToggler from './ColorToggler'
const QUE_AVATAR_GRP = 'QUE_AVATAR_GRP'

const AvatarMenu = () => {
  const userCode = useSelector(selectCode('USER'))
  const userImage = useSelector(selectCode(userCode, 'PRI_IMAGE_URL'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))
  const userName = useSelector(selectCode(userCode, 'PRI_USERNAME'))
  const associatedEntitiy = useSelector(selectCode(userCode, 'PRI_ASSOC_ENTITY_NAME'))
  const avatarAsks = useSelector(selectCode(QUE_AVATAR_GRP))

  const { getImageSrc } = useApi()

  const title = `${name?.value || userName?.value}${
    associatedEntitiy ? ` - ${associatedEntitiy?.value}` : ''
  }`

  if (!avatarAsks) return null

  return (
    <Menu>
      <MenuButton>
        <Avatar
          color="whitesmoke"
          bg="teal.400"
          name={name?.value || userName?.value}
          src={getImageSrc(userImage?.value)}
        />
      </MenuButton>
      <MenuList>
        <MenuGroup title={title}>
          {avatarAsks.map(childAsk => (
            <ChildMenuItem key={childAsk} questionCode={QUE_AVATAR_GRP} childCode={childAsk} />
          ))}
        </MenuGroup>
        <Flex>
          <Spacer />
          <ColorToggler />
        </Flex>
      </MenuList>
    </Menu>
  )
}

export default AvatarMenu
