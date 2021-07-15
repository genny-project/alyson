import { IconButton } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Action from 'app/BE/context/Action'
import getActions from 'app/SBE/utils/get-actions'
import { tail } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const DetailActions = ({ sbeCode, beCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe) || []

  if (!actions.length) return null

  return (
    <HStack spacing={5}>
      <Action parentCode={sbeCode} code={actions[0]} targetCode={beCode} noMenu />
      {actions.length > 1 && (
        <Menu>
          <MenuButton test-id={'detail-view-actions'}>
            <IconButton
              colorScheme="primary"
              variant="outline"
              icon={<FontAwesomeIcon icon={faEllipsisH} />}
            />
          </MenuButton>
          <MenuList>
            {tail(actions).map(action => (
              <Action key={action} parentCode={sbeCode} code={action} targetCode={beCode} />
            ))}
          </MenuList>
        </Menu>
      )}
    </HStack>
  )
}

export default DetailActions
