import { VStack, HStack } from '@chakra-ui/react'
import Attribute from 'app/BE/attribute'
import getActions from 'app/SBE/utils/get-actions'
import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import Action from 'app/BE/action'
import Label from 'app/BE/attribute/Label'

const Cv = ({ sbeCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode)) || ['']
  const code = rows[0]

  const attributes = useSelector(selectCode(code))
  // const assocOccupation = useSelector(selectCode(code, 'PRI_ASSOC_OCCUPATION'))

  if (!sbe) return null

  const actions = getActions(sbe)

  // const Code = ({ attr }) => <Attribute code={code} attribute={attr} />

  return (
    <VStack spacing="4" p="3" w="full" h="max-content">
      <HStack>
        {actions &&
          actions.map(action => (
            <Action key={action} parentCode={sbeCode} code={action} targetCode={code} />
          ))}
      </HStack>
      {attributes &&
        attributes.map(attr => (
          <VStack key={attr}>
            <Label code={code} attribute={attr} />
            <Attribute code={code} attribute={attr} />
          </VStack>
        ))}
    </VStack>
  )
}

export default Cv
