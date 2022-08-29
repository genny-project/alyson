import { HStack, Text, Box } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { equals, includes, reduce } from 'ramda'
import { faEllipsisH, faPlus } from '@fortawesome/free-solid-svg-icons'

import Action from 'app/BE/context/Action'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import getActions from 'app/SBE/utils/get-actions'
import getUserType from 'utils/helpers/get-user-type'
import sameLength from 'redux/utils/same-length'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const DetailActions = ({ sbeCode, beCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe) || []

  const getReducedActions = action =>
    reduce((acc, value) => (acc = !includes('_APPLY')(value) ? acc.concat(value) : acc), [])(action)

  const reducedActions = getReducedActions(actions)

  const userCode = useSelector(selectCode('USER'), equals)
  const userType = getUserType(useSelector(selectCode(userCode), sameLength))

  return (
    <HStack spacing={3}>
      {userType !== 'INTERN' && (
        <Action
          parentCode={sbeCode}
          code={'ACT_PRI_EVENT_APPLY'}
          targetCode={beCode}
          noMenu
          icon={faPlus}
          name={'Apply'}
          customAction
        />
      )}
      <Attribute
        code={beCode}
        attribute="PRI_CV"
        config={{ customButton: true, name: 'Download CV' }}
      />
      {reducedActions.length > 0 ? (
        <Box>
          <Menu placement="bottom-end">
            <MenuButton test-id={'detail-view-actions'}>
              <>
                {/* <IconButton
                test-id={'detail-view-actions'}
                colorScheme="primary"
                variant="outline"
                icon={<FontAwesomeIcon icon={faEllipsisH} />}
                borderRadius="2rem"
                p="1rem"
              /> */}
                <Text
                  border="1px"
                  borderColor="#2B6CB0"
                  borderRadius="2rem"
                  py="2"
                  px="4"
                  lineHeight="1.35"
                >
                  <FontAwesomeIcon color="#2B6CB0" icon={faEllipsisH} />
                </Text>
              </>
            </MenuButton>
            <MenuList zIndex={'modal'}>
              {reducedActions.map((action, index) => (
                <Action
                  key={`${action}-${index}`}
                  parentCode={sbeCode}
                  code={action}
                  targetCode={beCode}
                />
              ))}
            </MenuList>
          </Menu>
        </Box>
      ) : null}
    </HStack>
  )
}

export default DetailActions
