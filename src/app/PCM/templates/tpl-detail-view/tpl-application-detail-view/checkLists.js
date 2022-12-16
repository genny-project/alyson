import { Box, Grid, HStack, Switch, Text } from '@chakra-ui/react'
import { compose, equals, find } from 'ramda'

import { selectCode, selectCodeUnary, selectAttributes } from 'redux/db/selectors'
import useGetDetailData from '../get-detail-data'
import { useSelector } from 'react-redux'

const CheckLists = ({ code, mappedPcm }) => {
  const { baseEntityCode, fields } = useGetDetailData(mappedPcm)

  const matchesVISACode = 'PRI_MATCHES_VISA'
  const matchesEmpContractCode = 'PRI_MATCHES_EMPLOYMENT_CONTRACT'
  const websiteInvestigatedCode = 'PRI_WEBSITE_INVESTIGATED'
  const adminConfirmedCode = 'PRI_ADMIN_CONFIRMED'

  const [
    matchesVISACodeObject,
    matchesEmpContractCodeObject,
    websiteInvestigatedCodeObject,
    adminConfirmedCodeObject,
  ] = useSelector(
    selectAttributes(baseEntityCode, [
      'PRI_MATCHES_VISA',
      'PRI_MATCHES_EMPLOYMENT_CONTRACT',
      'PRI_WEBSITE_INVESTIGATED',
      'PRI_ADMIN_CONFIRMED',
    ]),
  )

  // console.log("REFACTORING==>",{code, matchesVISACode, matchesVISACodeObject, matchesEmpContractCode, matchesEmpContractCodeObject,
  // websiteInvestigatedCode, websiteInvestigatedCodeObject, adminConfirmedCode, adminConfirmedCodeObject})

  const matchesVISALabel =
    useSelector(selectCode(baseEntityCode, matchesVISACode))?.attributeName || ''
  const matchesVisaLabelCopy = matchesVISACodeObject?.attributeName || ''

  const matchesEmpContractLabel =
    compose(useSelector, selectCodeUnary(matchesEmpContractCode))('attributeName') || ''
  const matchesEmpContractLabelCopy = matchesEmpContractCodeObject?.attributeName || ''

  const websiteInvestigatedLabel =
    useSelector(selectCode(baseEntityCode, websiteInvestigatedCode))?.attributeName || ''
  const websiteInvestigatedLabelCopy = websiteInvestigatedCodeObject?.attributeName || ''

  const adminConfirmedLabel =
    useSelector(selectCode(baseEntityCode, adminConfirmedCode))?.attributeName || ''
  const adminConfirmedLabelCopy = adminConfirmedCodeObject?.attributeName || ''

  const matchesVISA = useSelector(selectCode(baseEntityCode, matchesVISACode))?.value || false
  const matchesVISACopy = matchesVISACodeObject?.value || false

  const matchesEmpContract =
    useSelector(selectCode(baseEntityCode, matchesEmpContractCode))?.value || false
  const matchesEmpContractCopy = matchesEmpContractCodeObject?.value || false

  const websiteInvestigated =
    useSelector(selectCode(baseEntityCode, websiteInvestigatedCode))?.value || false
  const websiteInvestigatedCopy = websiteInvestigatedCodeObject?.value || false

  const adminConfirmed = useSelector(selectCode(baseEntityCode, adminConfirmedCode))?.value || false
  const adminConfirmedCopy = adminConfirmedCodeObject?.value || false

  console.log({
    matchesVISALabel,
    matchesVisaLabelCopy,
    matchesEmpContractLabel,
    matchesEmpContractLabelCopy,
    websiteInvestigatedLabel,
    websiteInvestigatedLabelCopy,
    adminConfirmedLabel,
    adminConfirmedLabelCopy,
    matchesVISA,
    matchesVISACopy,
    matchesEmpContract,
    matchesEmpContractCopy,
    websiteInvestigated,
    websiteInvestigatedCopy,
    adminConfirmed,
    adminConfirmedCopy,
  })

  const CheckListItem = ({ label, isChecked }) => {
    return (
      <HStack key={label} justifyContent={'space-between'}>
        <Text>{label}</Text>
        <Switch isChecked={isChecked} />
      </HStack>
    )
  }

  return (
    <Box>
      <Grid gap="1rem">
        <CheckListItem label={matchesVISALabel} isChecked={matchesVISA} />
        <CheckListItem label={matchesEmpContractLabel} isChecked={matchesEmpContract} />
        <CheckListItem label={websiteInvestigatedLabelCopy} isChecked={websiteInvestigated} />
        <CheckListItem label={adminConfirmedLabel} isChecked={adminConfirmed} />
      </Grid>
    </Box>
  )
}

export default CheckLists
