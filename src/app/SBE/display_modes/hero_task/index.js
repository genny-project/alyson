import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Text, HStack, Spacer, VStack, Badge, Button } from '@chakra-ui/react'
import getActions from 'app/SBE/utils/get-actions'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faFile, faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { head, includes } from 'ramda'
import { onSendMessage } from 'vertx'

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

  const actionCode = head(
    actions.filter(act =>
      ready ? includes('_DOWN', act || '') : !includes('_DOWN', act || ''),
    ) || [''],
  )
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

      <Spacer w="1rem" />
      <VStack>
        {ready ? (
          <Button
            onClick={() =>
              onSendMessage({
                code: actionCode,
                parentCode: sbeCode,
                targetCode,
              })
            }
            leftIcon={<FontAwesomeIcon icon={faFileDownload} />}
            variant="ghost"
          >
            Download
          </Button>
        ) : (
          <Button
            onClick={() =>
              onSendMessage({
                code: actionCode,
                parentCode: sbeCode,
                targetCode,
              })
            }
            colorScheme="red"
            leftIcon={<FontAwesomeIcon icon={faClipboard} />}
          >
            Please Completete
          </Button>
        )}
      </VStack>
    </HStack>
  )
}

export default HeroTask
