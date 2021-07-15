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
  HStack,
} from '@chakra-ui/react'
import ChildMenuItem from 'app/ASKS/menu/ChildMenuItem'
import ColorToggler from './ColorToggler'
import { onSendMessage } from 'vertx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { apiConfig } from 'config/get-api-config'

const QUE_AVATAR_GRP = 'QUE_AVATAR_GRP'

const AvatarMenu = () => {
  const userCode = useSelector(selectCode('USER'))
  const userImage = useSelector(selectCode(userCode, 'PRI_IMAGE_URL'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))
  const userName = useSelector(selectCode(userCode, 'PRI_USERNAME'))
  const associatedEntitiy = useSelector(selectCode(userCode, 'PRI_ASSOC_ENTITY_NAME'))
  const avatarAsks = useSelector(selectCode(QUE_AVATAR_GRP))
  const { keycloak } = useKeycloak()
  const { getImageSrc } = useApi()

  const title = `${name?.value || userName?.value}${
    associatedEntitiy?.value ? ` - ${associatedEntitiy?.value}` : ''
  }`

  const onOpenHelp = () => onSendMessage({ code: 'ACT_PRI_HELPER_FUNCTION' })
  const onTandC = () => onSendMessage({ code: 'ACT_PRI_EVENT_TERMS_AND_CONDITIONS' })

  if (!avatarAsks)
    return (
      <Menu>
        <MenuButton>
          <HStack spacing={1} color="grey">
            <Avatar
              color="white"
              bg="gradient.400"
              name={name?.value || userName?.value}
              src={getImageSrc(userImage?.value)}
            />
            <FontAwesomeIcon icon={faCaretDown} />
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuGroup title={title}>
            <MenuItem test-id={'HELP'} onClick={onOpenHelp}>
              {`Help & Support`}
            </MenuItem>
            <MenuItem
              test-id={'QUE_AVATAR_LOGOUT'}
              onClick={() => {
                onSendMessage({ code: 'LOGOUT' }, { event_type: 'LOGOUT' })
                window.localStorage.localToken = ''
                window.localStorage.removeItem('state')
                window.location.assign(window.location.origin)
                keycloak.logout()
              }}
            >
              Logout
            </MenuItem>
          </MenuGroup>
        </MenuList>
      </Menu>
    )

  return (
    <Menu>
      <MenuButton>
        <HStack spacing={1} color="grey">
          <Avatar
            color="white"
            bg="gradient.400"
            name={name?.value || userName?.value}
            src={getImageSrc(userImage?.value)}
          />
          <FontAwesomeIcon icon={faCaretDown} />
        </HStack>
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

          <a
            href={`https://keycloak.gada.io/auth/realms/${apiConfig?.realm}/account/`}
            target="_blank"
            rel="noreferrer"
          >
            <MenuItem test-id={'QUE_AVATAR_SETTINGS'}>Account</MenuItem>
          </a>

          <MenuItem test-id={'HELP'} onClick={onOpenHelp}>
            {`Help & Support`}
          </MenuItem>
          <MenuItem test-id={'T&Cs'} onClick={onTandC}>
            {`Terms & Conditions`}
          </MenuItem>
          <MenuItem
            test-id={'QUE_AVATAR_LOGOUT'}
            onClick={() => {
              onSendMessage({ code: 'LOGOUT' }, { event_type: 'LOGOUT' })
              window.localStorage.localToken = ''
              window.localStorage.removeItem('state')
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
    </Menu>
  )
}

export default AvatarMenu
