import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { useGetLabel, useIsMobile } from 'utils/hooks'

import Draft from './Draft'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import getUserType from 'utils/helpers/get-user-type'
import icons from 'utils/icons'
import { selectCode } from 'redux/db/selectors'
import { useGetAttributeFromProjectBaseEntity } from 'app/BE/project-be'
import { useSelector } from 'react-redux'

const Drafts = ({ code: DRAFT_GROUP, textColor }) => {
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))
  const drafts = (useSelector(selectCode(DRAFT_GROUP)) || []).filter(
    code => code.indexOf('TASK') !== -1,
  )
  const label = useGetLabel(DRAFT_GROUP)

  const iconColor = useGetAttributeFromProjectBaseEntity('PRI_COLOR')?.valueString || '#234371'

  const isMobile = useIsMobile()

  if (userType === 'INTERN') return null

  return (
    <Box>
      <Menu>
        <MenuButton fontSize={'sm'}>
          <VStack color="grey" test-id={DRAFT_GROUP}>
            <Box>
              <FontAwesomeIcon size="lg" w="8" h="8" icon={icons[DRAFT_GROUP]} color={iconColor} />
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
            {!isMobile && (
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
          {drafts.reverse().map(draft => (
            <Draft key={draft} parentCode={DRAFT_GROUP} code={draft} />
          ))}
        </MenuList>
      </Menu>
    </Box>
  )
}

export default Drafts
