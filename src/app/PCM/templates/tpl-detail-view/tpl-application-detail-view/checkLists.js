import { Box, Grid, HStack, Switch, Text } from '@chakra-ui/react'
import { selectAttributes } from 'redux/db/selectors'
import useGetDetailData from '../get-detail-data'
import { useSelector } from 'react-redux'

const CheckLists = ({ mappedPcm }) => {
  const { baseEntityCode } = useGetDetailData(mappedPcm)

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

  const matchesVisaLabel = matchesVISACodeObject?.attributeName || ''

  const matchesEmpContractLabel = matchesEmpContractCodeObject?.attributeName || ''

  const websiteInvestigatedLabel = websiteInvestigatedCodeObject?.attributeName || ''

  const adminConfirmedLabel = adminConfirmedCodeObject?.attributeName || ''

  const matchesVISA = matchesVISACodeObject?.value || false

  const matchesEmpContract = matchesEmpContractCodeObject?.value || false

  const websiteInvestigated = websiteInvestigatedCodeObject?.value || false

  const adminConfirmed = adminConfirmedCodeObject?.value || false

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
        <CheckListItem label={matchesVisaLabel} isChecked={matchesVISA} />
        <CheckListItem label={matchesEmpContractLabel} isChecked={matchesEmpContract} />
        <CheckListItem label={websiteInvestigatedLabel} isChecked={websiteInvestigated} />
        <CheckListItem label={adminConfirmedLabel} isChecked={adminConfirmed} />
      </Grid>
    </Box>
  )
}

export default CheckLists
