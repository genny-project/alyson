import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useKeycloak } from '@react-keycloak/web'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  MenuGroup,
  Flex,
  Spacer,
  useDisclosure,
} from '@chakra-ui/react'
import ChildMenuItem from 'app/ASKS/menu/ChildMenuItem'
import ColorToggler from './ColorToggler'
import { onSendMessage } from 'vertx'
import SettingsModal from './SettingsModal'

const QUE_AVATAR_GRP = 'QUE_AVATAR_GRP'

const AvatarMenu = () => {
  const userCode = useSelector(selectCode('USER'))
  const userImage = useSelector(selectCode(userCode, 'PRI_IMAGE_URL'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))
  const userName = useSelector(selectCode(userCode, 'PRI_USERNAME'))
  const associatedEntitiy = useSelector(selectCode(userCode, 'PRI_ASSOC_ENTITY_NAME'))
  const avatarAsks = useSelector(selectCode(QUE_AVATAR_GRP))
  const { keycloak } = useKeycloak()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { getImageSrc } = useApi()

  const title = `${name?.value || userName?.value}${
    associatedEntitiy?.value ? ` - ${associatedEntitiy?.value}` : ''
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
          {avatarAsks
            .filter(
              childAsk => childAsk !== 'QUE_AVATAR_LOGOUT' && childAsk !== 'QUE_AVATAR_SETTINGS',
            )
            .map(childAsk => (
              <ChildMenuItem
                rootCode={userCode}
                targetCode={userCode}
                key={childAsk}
                questionCode={QUE_AVATAR_GRP}
                childCode={childAsk}
              />
            ))}
          <MenuItem onClick={onOpen}>Settings</MenuItem>
          <MenuItem
            onClick={() => {
              onSendMessage({ code: 'LOGOUT' }, { event_type: 'LOGOUT' })
              window.localStorage.localToken = ''
              window.location.assign(window.location.origin)
              keycloak.logout()
            }}
          >
            Logout
          </MenuItem>
        </MenuGroup>
        <Flex>
          <Spacer />
          <ColorToggler />
        </Flex>
      </MenuList>
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </Menu>
  )
}

export default AvatarMenu
