import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import { useIsMobile } from 'utils/hooks'
import icons from 'utils/icons'
import labels from 'utils/labels'
import Draft from './Draft'

const DRAFT_GROUP = 'QUE_DRAFTS_GRP'

const Drafts = () => {
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))
  const drafts = (useSelector(selectCode(DRAFT_GROUP)) || []).filter(
    code => code.indexOf('TASK') !== -1,
  )

  const isMobile = useIsMobile()

  if (!(userType === 'AGENT' || userType === 'ADMIN')) return null

  return (
    <Menu>
      <MenuButton>
        <VStack color="grey" test-id={DRAFT_GROUP}>
          <Box>
            <FontAwesomeIcon size="lg" icon={icons[DRAFT_GROUP]} />
            <Center
              ml="0.8rem"
              mt="-1rem"
              position="absolute"
              bgColor="red.200"
              color="white"
              borderRadius="100%"
              w="1.5rem"
              h="1.5rem"
              hidden={!drafts.length || drafts.length === 1}
            >
              <Text fontSize="xs" fontWeight="semibold">
                {drafts.length - 1}
              </Text>
            </Center>
          </Box>
          {!isMobile && (
            <HStack spacing={1}>
              <Text>{labels[DRAFT_GROUP]}</Text>
              <FontAwesomeIcon icon={faCaretDown} />
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
  )
}

export default Drafts
