import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, HStack, Spacer, VStack, Badge } from '@chakra-ui/react'
import getActions from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { includes } from 'ramda'

const HeroTask = ({ sbeCode, rows }) => {
  const targetCode = rows[0]

  const sbe = useSelector(selectCode(sbeCode))
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const actions = getActions(sbe)
  const validation = useSelector(selectCode(targetCode, 'PRI_VALIDATION'))

  const value = validation?.value

  const ready =
    value === 'Ready' ||
    (includes('_OHNS_', sbeCode) && value === 'OHS') ||
    (includes('_SERVICE_AGREEMENT_DOC_', sbeCode) && value === 'HCS')

  return (
    <HStack w="full" align="start">
      <VStack align="start">
        <HStack>
          <FontAwesomeIcon icon={faFile} />
          <Text>{title?.value}</Text>
        </HStack>
        <Badge colorScheme={ready ? 'green' : 'red'}>{ready ? 'Verified' : 'Unverified'}</Badge>
      </VStack>

      <Spacer w="1rem" />
      <VStack>
        {actions
          ?.filter(action =>
            ready ? includes('_DOWNLOAD_', action) : !includes('_DOWNLOAD_', action),
          )
          .map(action => (
            <Action key={action} parentCode={sbeCode} code={action} targetCode={targetCode} />
          ))}
      </VStack>
    </HStack>
  )
}

export default HeroTask
