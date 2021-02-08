import { VStack, HStack } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import getActions from 'app/SBE/utils/get-actions'
import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import Action from 'app/BE/action'

const Cv = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode)) || ['']
  const code = rows[0]

  if (!sbe) return null

  const actions = getActions(sbe)

  return (
    <VStack p="3" w="full">
      <HStack>
        {actions.map(action => (
          <Action key={action} parentCode={sbeCode} code={action} targetCode={code} />
        ))}
      </HStack>
      <Attribute code={code} attribute={'PRI_IMAGE_URL'} />
      <Attribute code={code} attribute={'PRI_NAME'} />
    </VStack>
  )
}

export default Cv
