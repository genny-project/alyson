import { Box, Grid, HStack, Text } from '@chakra-ui/react'
import { equals, find } from 'ramda'

import Attribute from 'app/BE/attribute'
import { selectCode } from 'redux/db/selectors'
import useGetDetailData from '../get-detail-data'
import { useSelector } from 'react-redux'

const CheckLists = ({ mappedPcm }) => {
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

  const CheckListItem = ({ label, attribute }) => {
    return (
      <HStack justifyContent={'space-between'}>
        <Text>{label}</Text>
        <Attribute code={baseEntityCode} attribute={attribute} />
      </HStack>
    )
  }

  return (
    <Box>
      <Grid gap="1rem">
        <CheckListItem label={matchesVISALabel} attribute={matchesVISACode} />
        <CheckListItem label={matchesEmpContractLabel} attribute={matchesEmpContractCode} />
        <CheckListItem label={websiteInvestigatedLabel} attribute={websiteInvestigatedCode} />
        <CheckListItem label={adminConfirmedLabel} attribute={adminConfirmedCode} />
      </Grid>
    </Box>
  )
}

export default CheckLists
