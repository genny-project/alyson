import { useSelector } from 'react-redux'
import { HStack } from '@chakra-ui/layout'
import { map } from 'ramda'

import Action from 'app/BE/context/Action'
import getActions from 'app/SBE/utils/get-actions'
import { selectCode } from 'redux/db/selectors'

const DetailActions = ({ sbeCode, beCode }) => {
  const sbe = useSelector(selectCode(sbeCode))
  const actions = getActions(sbe) || []

  if (!actions.length) return null

  return (
    <HStack>
      {map(action => (
        <Action key={action} parentCode={sbeCode} code={action} targetCode={beCode} noMenu />
      ))(actions)}
    </HStack>
  )
}

export default DetailActions
