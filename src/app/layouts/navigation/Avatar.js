import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useGetRealm, useIsMobile } from 'utils/hooks'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useKeycloak } from '@react-keycloak/web'
import useApi from 'api'
import ChildMenuItem from 'app/ASKS/menu/ChildMenuItem'
import { apiConfig } from 'config/get-api-config'
import { equals } from 'ramda'
import { Iconly } from 'react-iconly'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useIsProductInternmatch, useIsProductLojing } from 'utils/helpers/check-product-name'
import useGetProductName from 'utils/helpers/get-product-name'
import { onSendMessage } from 'vertx'

const AvatarMenu = ({ code: QUE_AVATAR_GRP }) => {
  const userCode = useSelector(selectCode('USER'))
  const isProductInternMatch = useIsProductInternmatch()
  const productName = useGetProductName().toLowerCase()
  const isMobile = useIsMobile()

  const realm = useGetRealm()
  const isProductLojing = useIsProductLojing()

  const imageAttr = equals('mentormatch', realm)
    ? 'PRI_USER_PROFILE_PICTURE'
    : isProductLojing
    ? 'PRI_IMAGE'
    : 'PRI_IMAGE_URL'

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

  // Far too much hard coding here, gotta do something about it!
  // Maybe get the backend to send back an event to tell alyson to log out/redirect to account page

  const onOpenHelp = () => onSendMessage({ code: 'ACT_PRI_HELPER_FUNCTION' })
  const onTandC = () => onSendMessage({ code: 'ACT_PRI_EVENT_TERMS_AND_CONDITIONS' })

  if (!avatarAsks)
    return (
      <Box>
        <Menu>
          <MenuButton test-id={'QUE_AVATAR_GRP'}>
            <HStack spacing={1} color="grey">
              <Avatar
                color="white"
                bg={isProductInternMatch ? 'internmatch.primary' : 'gradient.400'}
                name={name?.value || userName?.value}
                src={getImageSrc(userImage?.value)}
                size="md"
                borderWidth={isProductInternMatch ? '1px' : '0'}
                borderStyle={isProductInternMatch ? 'solid' : 'none'}
                borderColor={
                  isMobile && isProductInternMatch
                    ? `${productName}.white`
                    : isProductInternMatch
                    ? `${productName}.primary`
                    : 'transparent'
                }
              />
              {isProductInternMatch ? (
                <Iconly name="ChevronDown" set="two-tone" primaryColor="#063231" size={'small'} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
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
          <HStack spacing={1} color="product.gray700">
            <Avatar
              size={'md'}
              color="white"
              bg={isProductInternMatch ? 'internmatch.primary' : 'gradient.400'}
              name={name?.value || userName?.value}
              src={getImageSrc(userImage?.value)}
              borderWidth={isProductInternMatch ? '1px' : '0'}
              borderStyle={isProductInternMatch ? 'solid' : 'none'}
              borderColor={
                isMobile && isProductInternMatch
                  ? `${productName}.white`
                  : isProductInternMatch
                  ? `${productName}.primary`
                  : 'transparent'
              }
            />

            {isProductInternMatch ? (
              <Iconly name="ChevronDown" set="two-tone" primaryColor="#063231" size={'small'} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
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
              href={`${keycloak?.authServerUrl}/realms/${apiConfig?.realm}/account/`}
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
        </MenuList>
      </Menu>
    </Box>
  )
}

export default AvatarMenu
