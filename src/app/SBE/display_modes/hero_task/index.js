import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, HStack, Spacer, VStack, Badge, Button } from '@chakra-ui/react'
import getActions from 'app/SBE/utils/get-actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { head, includes } from 'ramda'
import { onSendMessage } from 'vertx'

const HeroTask = ({ sbeCode, rows }) => {
  const targetCode = rows[0]

  const sbe = useSelector(selectCode(sbeCode))
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const validationAttribute = useSelector(selectCode(sbeCode, 'SCH_VALIDATION_ATTRIBUTE'))

  const actions = getActions(sbe)
  const validation = useSelector(selectCode(targetCode, validationAttribute?.value))

  const value = validation?.value

  const ready =
    value === 'Ready' ||
    value === 'Validated' ||
    value === true ||
    (includes('_OHNS_', sbeCode) && value === 'OHS') ||
    (includes('_SERVICE_AGREEMENT_DOC_', sbeCode) && value === 'HCS')

  const actionCode = head(
    actions.filter(act =>
      ready ? includes('_VALIDATED', act || '') : includes('_UNVALIDATED', act || ''),
    ) || [''],
  )

  const validatedAction = actions.filter(act => includes('_VALIDATED', act || ''))
  const unvalidatedAction = actions.filter(act => includes('_UNVALIDATED', act || ''))

  const validatedActionButtonLabel = useSelector(selectCode(sbeCode, validatedAction))
    ?.attributeName

  const unvalidatedActionButtonLabel = useSelector(selectCode(sbeCode, unvalidatedAction))
    ?.attributeName

  return (
    <HStack w="full" align="start">
      <VStack align="start">
        <HStack>
          <FontAwesomeIcon icon={faFile} />
          <Text>{title?.value}</Text>
        </HStack>
        <Badge colorScheme={ready ? 'green' : 'red'}>
          {ready ? 'Verified' : 'Action Required'}
        </Badge>
      </VStack>

      <Spacer w={['', '1rem']} />
      <Button
        onClick={() =>
          onSendMessage({
            code: actionCode,
            parentCode: sbeCode,
            targetCode,
          })
        }
        colorScheme={ready ? 'primary' : 'red'}
      >
        {ready ? validatedActionButtonLabel : unvalidatedActionButtonLabel}
      </Button>
    </HStack>
  )
}

export default HeroTask
