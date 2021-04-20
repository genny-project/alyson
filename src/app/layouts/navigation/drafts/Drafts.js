import { IconButton } from '@chakra-ui/button'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { faDraftingCompass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import Draft from './Draft'

const DRAFT_GROUP = 'QUE_DRAFTS_GRP'

const Drafts = () => {
  const userCode = useSelector(selectCode('USER'))
  const userType = getUserType(useSelector(selectCode(userCode)))
  const drafts = (useSelector(selectCode(DRAFT_GROUP)) || []).filter(
    code => code.indexOf('TASK') !== -1,
  )

  if (!(userType === 'AGENT' || userType === 'ADMIN')) return null

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        colorScheme="pink"
        icon={<FontAwesomeIcon icon={faDraftingCompass} />}
      />

      <MenuList maxH="20vh" overflow="scroll">
        {drafts.map(draft => (
          <Draft key={draft} parentCode={DRAFT_GROUP} code={draft} />
        ))}
      </MenuList>
    </Menu>
  )
}

export default Drafts
