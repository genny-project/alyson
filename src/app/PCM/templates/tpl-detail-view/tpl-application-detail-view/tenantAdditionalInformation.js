import { Box, Flex, Grid } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import { compose, map } from 'ramda'
import { selectCodeUnary } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const TenantAdditionalInformation = ({ code, isStudent }) => {
  const companyName = compose(useSelector, selectCodeUnary(code))('PRI_COMPANY_NAME')?.value
  const conmmencementDate = compose(useSelector, selectCodeUnary(code))('PRI_COMMENCEMENT_DATE')
    ?.value
  const name = compose(useSelector, selectCodeUnary(code))('PRI_NAME')?.value

  const arrivalDateLabel = compose(useSelector, selectCodeUnary(code))('PRI_ARRIVAL_DATE')
    ?.attributeName
  const familySizeLabel = compose(useSelector, selectCodeUnary(code))('LNK_FAMILY_SIZE')
    ?.attributeName
  const companyNameLabel = compose(useSelector, selectCodeUnary(code))('PRI_COMPANY_NAME')
    ?.attributeName

  const companyExists = companyName ? 'Yes' : 'No'
  const confirmEmployment = conmmencementDate ? 'Yes' : 'No'

  const tenantInformationLists = [
    {
      label: arrivalDateLabel,
      attr: 'PRI_ARRIVAL_DATE',
    },
    {
      label: familySizeLabel,
      attr: 'LNK_FAMILY_SIZE',
    },
  ]

  const companyConfirmation = [
    { label: companyNameLabel, attr: companyName },
    { label: 'Company Exists?', attr: companyExists },
    { label: `Company Confirms Employment of ${name}?`, attr: confirmEmployment },
  ]

  return (
    <Box>
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
            {`${label}:`}&nbsp;
            <Attribute code={code} attribute={attr} />
          </Flex>
        ))(tenantInformationLists)}

        {!isStudent && (
          <>
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
          </>
        )}
      </Grid>
    </Box>
  )
}

export default TenantAdditionalInformation
