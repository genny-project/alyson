import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from '@chakra-ui/react'

import ChildMenuItem from 'app/ASKS/menu/ChildMenuItem'
import ColorToggler from './ColorToggler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { useGetRealm } from 'utils/hooks'
import { useKeycloak } from '@react-keycloak/web'
import { useSelector } from 'react-redux'

const AvatarMenu = ({ code: QUE_AVATAR_GRP }) => {
  const userCode = useSelector(selectCode('USER'))

  const realm = useGetRealm()
  const imageAttr = equals('mentormatch', realm) ? 'PRI_USER_PROFILE_PICTURE' : 'PRI_IMAGE_URL'

  const userImage = useSelector(selectCode(userCode, imageAttr))

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
      <Box>
        <Menu test-id={'QUE_AVATAR_GRP'}>
          <MenuButton>
            <HStack spacing={1} color="grey">
              <Avatar
                color="white"
                bg="gradient.400"
                name={name?.value || userName?.value}
                src={getImageSrc(userImage?.value)}
                size="md"
              />
              <FontAwesomeIcon icon={faCaretDown} />
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuGroup title={title}>
              <MenuItem
                test-id={'HELP'}
                onClick={onOpenHelp}
                color="gray.800"
                fontSize={'sm'}
                fontWeight={'medium'}
              >
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
                color="gray.800"
                fontSize={'sm'}
                fontWeight={'medium'}
              >
                Logout
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    )

  return (
    <Box>
      <Menu fontSize={'sm'}>
        <MenuButton test-id={'QUE_AVATAR_GRP'}>
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
              <MenuItem test-id={'QUE_AVATAR_SETTINGS'} fontSize={'sm'}>
                Account
              </MenuItem>
            </a>

            <MenuItem test-id={'HELP'} onClick={onOpenHelp} color="gray.800" fontSize={'0.875rem'}>
              {`Help & Support`}
            </MenuItem>
            <MenuItem test-id={'T&Cs'} onClick={onTandC} color="gray.800" fontSize={'sm'}>
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
              color="#000000"
              fontSize={'sm'}
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
    </Box>
  )
}

export default AvatarMenu
