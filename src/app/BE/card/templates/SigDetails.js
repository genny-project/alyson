import { useSelector } from 'react-redux'
import { selectAttributes } from 'redux/db/selectors'
import { HStack, Tooltip } from '@chakra-ui/react'
import IconAgent from 'app/layouts/components/im_icons/IconAgent'
import IconHostCpyRep from 'app/layouts/components/im_icons/IconHostCpyRep'
import IconIntern from 'app/layouts/components/im_icons/IconIntern'
const CODES = [
  'PRI_AGR_DOC_OUTCOME_SIGNATURE',
  'PRI_AGR_DOC_HC_SIGNATURE',
  'PRI_AGR_DOC_INT_SIGNATURE',
]
const SigDetails = ({ code }) => {
  const [agent, hc, intern] = useSelector(selectAttributes(code, CODES))

  return (
    <HStack>
      <Tooltip shouldWrapChildren label="Agent Signature">
        <IconAgent color={agent?.value ? 'green.300' : 'red.300'} />
      </Tooltip>
      <Tooltip shouldWrapChildren label="Host Company Signature">
        <IconHostCpyRep color={hc?.value ? 'green.300' : 'red.300'} />
      </Tooltip>
      <Tooltip shouldWrapChildren label="Intern Signature">
        <IconIntern color={intern?.value ? 'green.300' : 'red.300'} />
      </Tooltip>
    </HStack>
  )
}

export default SigDetails
