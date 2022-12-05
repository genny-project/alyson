import { Flex, Grid } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import { map } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TenantInformation = ({ code }) => {
  const companyName = useSelector(selectCode(code, 'PRI_COMPANY_NAME'))?.value
  const conmmencementDate = useSelector(selectCode(code, 'PRI_COMMENCEMENT_DATE'))?.value
  const name = useSelector(selectCode(code, 'PRI_NAME'))?.value

  const companyExists = companyName ? 'Yes' : 'No'
  const confirmEmployment = conmmencementDate ? 'Yes' : 'No'

  const tenantInformationLists = [
    { label: 'Arrival Date in Australia', attr: 'PRI_ARRIVAL_DATE' },
    { label: 'Family Size', attr: 'LNK_FAMILY_SIZE' },
    { label: 'Company Name', attr: 'PRI_COMPANY_NAME' },
  ]

  const companyConfirmation = [
    { label: 'Company Exists?', attr: companyExists },
    { label: `Company Confirms Employment of ${name}?`, attr: confirmEmployment },
  ]

  return (
    <Grid gap={'1rem'}>
      {map(({ label, attr }) => (
        <Flex
          paddingBlock={'1rem'}
          paddingInline={'clamp(1rem, 3vw, 2.88rem)'}
          borderRadius={42}
          bg={'#f4f5f5'}
          fontSize={12}
          fontWeight={600}
          color={'#7d7d7d'}
          key={label}
        >
          {`${label}: `}
          <Attribute code={code} attribute={attr} />
        </Flex>
      ))(tenantInformationLists)}

      {map(({ label, attr }) => (
        <Flex
          paddingBlock={'1rem'}
          paddingInline={'clamp(1rem, 3vw, 2.88rem)'}
          borderRadius={42}
          bg={'#f4f5f5'}
          fontSize={12}
          fontWeight={600}
          color={'#7d7d7d'}
          key={label}
        >
          {`${label}: ${attr}`}
        </Flex>
      ))(companyConfirmation)}
    </Grid>
  )
}

export default TenantInformation
