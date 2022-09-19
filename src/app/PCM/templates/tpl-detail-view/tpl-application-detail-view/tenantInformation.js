import { Box, Grid } from '@chakra-ui/react'

import { map } from 'ramda'

const TenantInformation = () => {
  const tenantInformationLists = [
    { label: 'Arrival Date in Australia', value: '6 June 2022' },
    { label: 'Family Size', value: 'Solo' },
    { label: 'Company Name', value: 'Fulton Hogam' },
    { label: 'Company Exists?', value: '' },
    { label: 'Company Confirms Employment of Darren Blair?', value: '' },
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
        >
          {label}
          {value}
        </Box>
      ))(tenantInformationLists)}
    </Grid>
  )
}

export default TenantInformation
