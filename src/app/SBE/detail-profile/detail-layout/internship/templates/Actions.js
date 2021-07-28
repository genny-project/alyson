import { useSelector } from 'react-redux'
import { IconButton } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { map } from 'ramda'

import Action from 'app/BE/context/Action'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'

const DetailActions = ({ sbeCode, beCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe) || []

  if (!actions.length) return null

  return (
    <HStack spacing={6}>
      <Action
        parentCode={sbeCode}
        code={actions[0]}
        targetCode={beCode}
        noMenu
        icon={faPencilAlt}
        name={`Edit`}
        customAction
      />
      {actions.length > 0 && (
        <Menu>
          <MenuButton>
            <IconButton
              test-id={'detail-view-actions'}
              colorScheme="primary"
              variant="outline"
              icon={<FontAwesomeIcon icon={faEllipsisH} />}
              borderRadius="2rem"
              p="1rem"
            />
          </MenuButton>
          <MenuList>
            {map(action => (
              <Action key={action} parentCode={sbeCode} code={action} targetCode={beCode} />
            ))(actions)}
          </MenuList>
        </Menu>
      )}
    </HStack>
  )
}

export default DetailActions
