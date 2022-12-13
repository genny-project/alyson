import { Box, Grid, HStack, Switch, Text } from '@chakra-ui/react'
import { equals, find } from 'ramda'

import { selectCode } from 'redux/db/selectors'
import useGetDetailData from '../get-detail-data'
import { useSelector } from 'react-redux'

const CheckLists = ({ code, mappedPcm }) => {
  const { baseEntityCode, fields } = useGetDetailData(mappedPcm)

  const findCode = code => find(equals(code))(fields) || ''

  const matchesVISACode = findCode('PRI_MATCHES_VISA')
  const matchesEmpContractCode = findCode('PRI_MATCHES_EMPLOYMENT_CONTRACT')
  const websiteInvestigatedCode = findCode('PRI_WEBSITE_INVESTIGATED')
  const adminConfirmedCode = findCode('PRI_ADMIN_CONFIRMED')

  const matchesVISALabel =
    useSelector(selectCode(baseEntityCode, matchesVISACode))?.attributeName || ''
  const matchesEmpContractLabel =
    useSelector(selectCode(baseEntityCode, matchesEmpContractCode))?.attributeName || ''
  const websiteInvestigatedLabel =
    useSelector(selectCode(baseEntityCode, websiteInvestigatedCode))?.attributeName || ''
  const adminConfirmedLabel =
    useSelector(selectCode(baseEntityCode, adminConfirmedCode))?.attributeName || ''

  const matchesVISA = useSelector(selectCode(baseEntityCode, matchesVISACode))?.value || false
  const matchesEmpContract =
    useSelector(selectCode(baseEntityCode, matchesEmpContractCode))?.value || false
  const websiteInvestigated =
    useSelector(selectCode(baseEntityCode, websiteInvestigatedCode))?.value || false
  const adminConfirmed = useSelector(selectCode(baseEntityCode, adminConfirmedCode))?.value || false

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
        <CheckListItem label={websiteInvestigatedLabel} isChecked={websiteInvestigated} />
        <CheckListItem label={adminConfirmedLabel} isChecked={adminConfirmed} />
      </Grid>
    </Box>
  )
}

export default CheckLists
