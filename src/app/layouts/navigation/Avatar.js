import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { Menu, MenuButton, MenuList, Avatar } from '@chakra-ui/react'
import ChildMenuItem from 'app/ASKS/menu/ChildMenuItem'

const QUE_AVATAR_GRP = 'QUE_AVATAR_GRP'

const AvatarMenu = () => {
  const userCode = useSelector(selectCode('USER'))
  const userImage = useSelector(selectCode(userCode, 'PRI_IMAGE_URL'))
  const userName = useSelector(selectCode(userCode, 'PRI_NAME'))
  const avatarAsks = useSelector(selectCode(QUE_AVATAR_GRP))

  const { getImageSrc } = useApi()

  console.log(getImageSrc(userImage?.value))

  if (!avatarAsks) return null
  return (
    <Menu>
      <MenuButton>
        <Avatar
          color="whitesmoke"
          bg="teal.300"
          name={userName?.value}
          src={getImageSrc(userImage?.value)}
        />
      </MenuButton>
      <MenuList>
        {avatarAsks.map(childAsk => (
          <ChildMenuItem key={childAsk} questionCode={QUE_AVATAR_GRP} childCode={childAsk} />
        ))}
      </MenuList>
    </Menu>
  )
}

export default AvatarMenu
