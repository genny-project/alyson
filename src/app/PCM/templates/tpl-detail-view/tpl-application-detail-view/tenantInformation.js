import { Box, Grid } from '@chakra-ui/react'

import { map } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TenantInformation = ({ code }) => {
  const arrivalDate = useSelector(selectCode(code, 'PRI_ARRIVAL_DATE'))?.value
  const familySize = useSelector(selectCode(code, 'LNK_FAMILY_SIZE'))?.value
  const companyName = useSelector(selectCode(code, 'PRI_COMPANY_NAME'))?.value
  const conmmencementDate = useSelector(selectCode(code, 'PRI_COMMENCEMENT_DATE'))?.value
  const name = useSelector(selectCode(code, 'PRI_NAME'))?.value

  const companyExists = companyName ? 'Yes' : 'No'
  const confirmEmployment = conmmencementDate ? 'Yes' : 'No'

  const tenantInformationLists = [
    { label: 'Arrival Date in Australia', value: arrivalDate },
    { label: 'Family Size', value: familySize },
    { label: 'Company Name', value: companyName },
    { label: 'Company Exists?', value: companyExists },
    { label: `Company Confirms Employment of ${name}?`, value: confirmEmployment },
  ]

  return (
    <Grid gap={'1rem'}>
      {map(({ label, value }) => (
        <Box
          paddingBlock={'1rem'}
          paddingInline={'clamp(1rem, 3vw, 2.88rem)'}
          borderRadius={42}
          bg={'#f4f5f5'}
          fontSize={12}
          fontWeight={600}
          color={'#7d7d7d'}
          key={label}
        >
          {`${label} : ${value}`}
        </Box>
      ))(tenantInformationLists)}
    </Grid>
  )
}

export default TenantInformation
