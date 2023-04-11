import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { compose, equals, includes } from 'ramda'
import { selectCode, selectCodeUnary } from 'redux/db/selectors'
import { useGetLabel, useIsMobile } from 'utils/hooks'

import { useTheme } from '@chakra-ui/react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import NotificationHandler from 'app/layouts/navigation/drafts/Draft'
import { Iconly } from 'react-iconly'
import { useSelector } from 'react-redux'
import { useIsProductLojing } from 'utils/helpers/check-product-name'
import getUserType from 'utils/helpers/get-user-type'
import icons from 'utils/icons'

const Notification = ({ code: NOTIFICATION_GROUP, textColor }) => {
  const theme = useTheme()
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))
  const userRole = useSelector(selectCode(userCode, 'LNK_ROLE'))?.value || ''
  const isTenant = includes('_TENANT', userRole)

  const notification = (useSelector(selectCode(NOTIFICATION_GROUP)) || []).filter(
    code => code.indexOf('TASK') !== -1,
  )

  let notificationWholeData =
    compose(useSelector, selectCodeUnary(NOTIFICATION_GROUP))('wholeData') || []
  let notificationCount =
    Array.isArray(notificationWholeData) && !!notificationWholeData.length
      ? notificationWholeData.length
      : ''

  const label = useGetLabel(NOTIFICATION_GROUP)

  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || '#234371'

  const isMobile = useIsMobile()
  const isProductLojing = useIsProductLojing()

  const getAskInformationBasedOnKey = compose(useSelector, selectCodeUnary(NOTIFICATION_GROUP))
  const sourceCode = getAskInformationBasedOnKey('sourceCode')
  const targetCode = getAskInformationBasedOnKey('targetCode')

  if (equals(userType)('INTERN')) return null

  return (
    <Box>
      <Menu>
        <MenuButton fontSize={'sm'}>
          <VStack color="grey" test-id={NOTIFICATION_GROUP}>
            <Box>
              {isProductLojing ? (
                <FontAwesomeIcon
                  size={isProductLojing ? 'lg' : '2x'}
                  w="8"
                  h="8"
                  icon={icons[NOTIFICATION_GROUP]}
                  color={iconColor}
                />
              ) : (
                <Box mt="2">
                  <Iconly
                    name="Notification"
                    set="two-tone"
                    size={'medium'}
                    primaryColor={
                      isMobile ? theme.colors.internmatch.light : theme.colors.internmatch.primary
                    }
                  />
                </Box>
              )}
              <Center
                ml={`0.5rem`}
                mt="-1.7rem"
                position="absolute"
                bgColor="red.500"
                color="white"
                borderRadius="100%"
                w={4}
                h={4}
                hidden={!notificationCount}
              >
                <Text textStyle="tail.2">{notificationCount}</Text>
              </Center>
            </Box>
            {!isMobile && isProductLojing && (
              <HStack spacing={1}>
                <Text fontSize="xs" textStyle="tail.2" color={textColor}>
                  {label}
                </Text>

                <FontAwesomeIcon icon={faCaretDown} color={iconColor} />
              </HStack>
            )}
          </VStack>
        </MenuButton>

        <MenuList>
          {!!isTenant
            ? notificationWholeData.map(notification => (
                <NotificationHandler
                  key={notification?.name}
                  parentCode={NOTIFICATION_GROUP}
                  code={notification?.question?.code || ''}
                  sourceCode={sourceCode}
                  targetCode={targetCode}
                />
              ))
            : notification
                .reverse()
                .map(notification => (
                  <NotificationHandler
                    key={notification}
                    parentCode={NOTIFICATION_GROUP}
                    code={notification}
                  />
                ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Notification
