import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import { HStack, Tooltip } from '@chakra-ui/react'
import IconAgent from 'app/layouts/components/im_icons/IconAgent'
import IconHostCpyRep from 'app/layouts/components/im_icons/IconHostCpyRep'
import IconIntern from 'app/layouts/components/im_icons/IconIntern'
import Button from 'app/layouts/components/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenAlt } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'
const CODES = [
  'PRI_AGR_DOC_OUTCOME_SIGNATURE',
  'PRI_AGR_DOC_HC_SIGNATURE',
  'PRI_AGR_DOC_INT_SIGNATURE',
]
const SigDetails = ({ code, parentCode, viewer }) => {
  const [agent, hc, intern] = useSelector(selectAttributes(code, CODES))

  return (
    <HStack justify="space-between" w="full">
      {(viewer === 'hcr' && !hc?.value) || (viewer === 'agent' && !agent?.value) ? (
        <Button
          onClick={() =>
            onSendMessage({ code: 'ACT_PRI_EVENT_VIEW_AGREEMENT', parentCode, targetCode: code })
          }
          size="xs"
          colorScheme="green"
          leftIcon={<FontAwesomeIcon size="xs" icon={faPenAlt} />}
        >
          Sign Agreement Document
        </Button>
      ) : (
        <div />
      )}
      <HStack>
        <Tooltip shouldWrapChildren label="Agent Signature">
          <IconAgent color={agent?.value !== 'https://bit.ly/3A2xdjI' ? 'green.300' : 'red.300'} />
        </Tooltip>
        <Tooltip shouldWrapChildren label="Host Company Signature">
          <IconHostCpyRep
            color={hc?.value !== 'https://bit.ly/3A2xdjI' ? 'green.300' : 'red.300'}
          />
        </Tooltip>
        <Tooltip shouldWrapChildren label="Intern Signature">
          <IconIntern
            color={intern?.value !== 'https://bit.ly/3A2xdjI' ? 'green.300' : 'red.300'}
          />
        </Tooltip>
      </HStack>
    </HStack>
  )
}

export default SigDetails
