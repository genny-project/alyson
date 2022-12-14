import { Box, Flex, Grid } from '@chakra-ui/react'

import Attribute from 'app/BE/attribute'
import { map } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const AdditionalInformation = ({ code, isStudent }) => {
  const companyName = useSelector(selectCode(code, 'PRI_COMPANY_NAME'))?.value || ''
  const conmmencementDate = useSelector(selectCode(code, 'PRI_COMMENCEMENT_DATE'))?.value || ''
  const name = useSelector(selectCode(code, 'PRI_NAME'))?.value || ''

  const arrivalDateLabel = useSelector(selectCode(code, 'PRI_ARRIVAL_DATE'))?.attributeName || ''
  const familySizeLabel = useSelector(selectCode(code, 'LNK_FAMILY_SIZE'))?.attributeName || ''
  const companyNameLabel = useSelector(selectCode(code, 'PRI_COMPANY_NAME'))?.attributeName || ''
  const familySizeCode = useSelector(selectCode(code, 'LNK_FAMILY_SIZE'))?.value || ''
  const familySizeCodeFormatted = familySizeCode.replace(/[[\]']+/g, '').replace(/"/g, '')

  const companyExists = companyName ? 'Yes' : 'No'
  const confirmEmployment = conmmencementDate ? 'Yes' : 'No'

  const tenantInformationLists = [
    {
      code: code,
      label: arrivalDateLabel,
      attr: 'PRI_ARRIVAL_DATE',
    },
    {
      code: familySizeCodeFormatted,
      label: familySizeLabel,
      attr: 'PRI_NAME',
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
        {map(({ code, label, attr }) => (
          <Flex
            paddingBlock={'1rem'}
            paddingInline={'clamp(1rem, 3vw, 2.88rem)'}
            borderRadius={42}
            bg={'#f4f5f5'}
            fontSize={12}
            fontWeight={600}
            color={'#7d7d7d'}
            key={attr}
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
                key={attr}
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

export default AdditionalInformation
