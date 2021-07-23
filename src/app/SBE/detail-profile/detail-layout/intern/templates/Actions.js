import { useSelector } from 'react-redux'
import { IconButton } from '@chakra-ui/button'
import { HStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Action from 'app/BE/context/Action'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'
import Attribute from 'app/BE/attribute'

const DetailActions = ({ sbeCode, beCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe) || []

  if (!actions.length) return null

  return (
    <HStack spacing={3}>
      <Action
        parentCode={sbeCode}
        code={'ACT_PRI_EVENT_APPLY'}
        targetCode={beCode}
        noMenu
        icon={faPlus}
        name={'Apply'}
        customAction
      />
      <Attribute
        code={beCode}
        attribute="PRI_CV"
        config={{ customButton: true, name: 'Download CV' }}
      />
      {actions.length > 1 && (
        <Menu placement="bottom-end">
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
            {actions.map(action => (
              <Action key={action} parentCode={sbeCode} code={action} targetCode={beCode} />
            ))}
          </MenuList>
        </Menu>
      )}
    </HStack>
  )
}

export default DetailActions
