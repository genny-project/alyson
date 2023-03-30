import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { compose, equals, includes } from 'ramda'
import { selectCode, selectCodeUnary } from 'redux/db/selectors'
import { useGetLabel, useIsMobile } from 'utils/hooks'

import { useTheme } from '@chakra-ui/react'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import Draft from 'app/layouts/navigation/drafts/Draft'
import { Iconly } from 'react-iconly'
import { useSelector } from 'react-redux'
import { useIsProductLojing } from 'utils/helpers/check-product-name'
import getUserType from 'utils/helpers/get-user-type'
import icons from 'utils/icons'

const Drafts = ({ code: DRAFT_GROUP, textColor }) => {
  const theme = useTheme()
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))
  const userRole = useSelector(selectCode(userCode, 'LNK_ROLE'))?.value || ''
  const isTenant = includes('_TENANT', userRole)

  const drafts = (useSelector(selectCode(DRAFT_GROUP)) || []).filter(
    code => code.indexOf('TASK') !== -1,
  )

  let draftsWholeData = compose(useSelector, selectCodeUnary(DRAFT_GROUP))('wholeData') || []
  console.log(draftsWholeData)

  const label = useGetLabel(DRAFT_GROUP)

  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || '#234371'

  const isMobile = useIsMobile()
  const isProductLojing = useIsProductLojing()

  if (equals(userType)('INTERN')) return null

  return (
    <Box>
      <Menu>
        <MenuButton fontSize={'sm'}>
          <VStack color="grey" test-id={DRAFT_GROUP}>
            <Box>
              {isProductLojing ? (
                <FontAwesomeIcon
                  size={isProductLojing ? 'lg' : '2x'}
                  w="8"
                  h="8"
                  icon={icons[DRAFT_GROUP]}
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
                hidden={!drafts.length || drafts.length === 1}
              >
                <Text textStyle="tail.2">{drafts.length - 1}</Text>
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
            ? draftsWholeData.map(draft => (
                <Draft
                  key={draft?.name}
                  parentCode={DRAFT_GROUP}
                  code={draft?.question?.code || ''}
                  recipientCodeArray={[]}
                />
              ))
            : drafts
                .reverse()
                .map(draft => <Draft key={draft} parentCode={DRAFT_GROUP} code={draft} />)}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Drafts
