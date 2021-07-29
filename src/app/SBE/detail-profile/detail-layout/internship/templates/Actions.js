import { useSelector } from 'react-redux'
import { IconButton } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'
import { map, tail, equals } from 'ramda'

import Action from 'app/BE/context/Action'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import getUserType from 'utils/helpers/get-user-type'
import sameLength from 'redux/utils/same-length'

const DetailActions = ({ sbeCode, beCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe) || []

  const userCode = useSelector(selectCode('USER'), equals)
  const userType = getUserType(useSelector(selectCode(userCode), sameLength))

  if (!actions.length) return null

  return (
    <HStack spacing={6}>
      <Action
        parentCode={sbeCode}
        code={actions[0]}
        targetCode={beCode}
        noMenu
        icon={userType === 'INTERN' ? faPlus : faPencilAlt}
        name={userType === 'INTERN' ? `Apply` : `Edit`}
        customAction
      />
      {actions.length > 1 && (
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
            ))(tail(actions))}
          </MenuList>
        </Menu>
      )}
    </HStack>
  )
}

export default DetailActions
