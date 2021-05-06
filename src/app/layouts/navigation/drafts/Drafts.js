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
const defaultDimension = 16
const defaultMarginLength = 0.5

const Drafts = () => {
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))
  const drafts = (useSelector(selectCode(DRAFT_GROUP)) || []).filter(
    code => code.indexOf('TASK') !== -1,
  )

  let getDimension =
    defaultDimension + (drafts.length - 1) * 1.6 > 32
      ? 36
      : defaultDimension + (drafts.length - 1) * 1.6
  let marginLeft =
    defaultMarginLength - 0.05 * (drafts.length - 1) < 0
      ? -0.5
      : defaultMarginLength - 0.05 * (drafts.length - 1)

  const isMobile = useIsMobile()

  if (!(userType === 'AGENT' || userType === 'ADMIN')) return null

  return (
    <Menu>
      <MenuButton>
        <VStack color="grey" test-id={DRAFT_GROUP}>
          <Box>
            <FontAwesomeIcon size="lg" w="8" h="8" icon={icons[DRAFT_GROUP]} />
            <Center
              ml={`${marginLeft}rem`}
              mt="-1.7rem"
              position="absolute"
              bgColor="red.500"
              color="white"
              borderRadius="100%"
              w={`${getDimension}px`}
              h={`${getDimension}px`}
              hidden={!drafts.length || drafts.length === 1}
            >
              <Text textStyle="tail.2">{drafts.length <= 11 ? drafts.length - 1 : `!!!`}</Text>
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
