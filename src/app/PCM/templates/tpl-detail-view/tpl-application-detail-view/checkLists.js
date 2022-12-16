import { Box, Grid, HStack, Switch, Text } from '@chakra-ui/react'
import { selectAttributes } from 'redux/db/selectors'
import useGetDetailData from '../get-detail-data'
import { useSelector } from 'react-redux'
import getLabelAndValueFromObject from 'app/PCM/helpers/get-label-and-value-from-object'

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

  const { label: matchesVisaLabel, value: matchesVisa } = getLabelAndValueFromObject(
    matchesVISACodeObject,
  )
  const { label: matchesEmpContractLabel, value: matchesEmpContract } = getLabelAndValueFromObject(
    matchesEmpContractCodeObject,
  )
  const {
    label: websiteInvestigatedLabel,
    value: websiteInvestigated,
  } = getLabelAndValueFromObject(websiteInvestigatedCodeObject)
  const { label: adminConfirmedLabel, value: adminConfirmed } = getLabelAndValueFromObject(
    adminConfirmedCodeObject,
  )

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
        <CheckListItem label={matchesVisaLabel} isChecked={matchesVisa} />
        <CheckListItem label={matchesEmpContractLabel} isChecked={matchesEmpContract} />
        <CheckListItem label={websiteInvestigatedLabel} isChecked={websiteInvestigated} />
        <CheckListItem label={adminConfirmedLabel} isChecked={adminConfirmed} />
      </Grid>
    </Box>
  )
}

export default CheckLists
