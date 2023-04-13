import { Box, Grid, Text, VStack, useTheme } from '@chakra-ui/react'
import { compose, map } from 'ramda'
import { selectCode, selectCodeUnary } from 'redux/db/selectors'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
import isJson from 'utils/helpers/is-json'
import useApi from 'api'
import useProductColors from 'utils/productColors'
import { useSelector } from 'react-redux'

const UploadedDocuments = ({ code }) => {
  const theme = useTheme()
  const { fieldHoverBackgroundColor } = useProductColors()
  const api = useApi()
  const { getDocumentSrc } = api

  const bankStatement =
    compose(useSelector, selectCodeUnary(code))('PRI_BANK_STATEMENT')?.value || ''
  const visaStatus = compose(useSelector, selectCodeUnary(code))('PRI_VISA')?.value || ''
  const passport = compose(useSelector, selectCodeUnary(code))('PRI_PASSPORT')?.value || ''
  const proofOfEmployment =
    compose(useSelector, selectCodeUnary(code))('PRI_PROOF_OF_EMPLOYMENT')?.value || ''
  const proofOfAcceptance =
    compose(useSelector, selectCodeUnary(code))('PRI_PROOF_OF_ACCEPTANCE')?.value || ''

  const bankStatementLabel =
    useSelector(selectCode(code, 'PRI_BANK_STATEMENT'))?.attribute?.name || ''
  const visaStatusLabel = useSelector(selectCode(code, 'PRI_VISA'))?.attribute?.name || ''
  const passportLabel = useSelector(selectCode(code, 'PRI_PASSPORT'))?.attribute?.name || ''
  const proofOfEmpLabel =
    useSelector(selectCode(code, 'PRI_PROOF_OF_EMPLOYMENT'))?.attribute?.name || ''
  const proofOfAcceptanceLabel =
    useSelector(selectCode(code, 'PRI_PROOF_OF_ACCEPTANCE'))?.attribute?.name || ''

  const documents = [
    { title: bankStatementLabel, attr: bankStatement },
    { title: visaStatusLabel, attr: visaStatus },
    { title: passportLabel, attr: passport },
    { title: proofOfEmpLabel, attr: proofOfEmployment },
    { title: proofOfAcceptanceLabel, attr: proofOfAcceptance },
  ]

  const onClick = attribute => {
    const uuidArray = isJson(attribute) ? JSON.parse(attribute) : attribute
    const uuid = uuidArray[0]
    const src = getDocumentSrc(uuid)
    window.open(src)
  }

  return (
    <>
      <Box marginBlockStart={'clamp(1.25rem, 7.5vw, 8.63rem)'}>
        <Text marginBlockEnd={'1.75rem'}>{'Application Details'}</Text>
        <Grid
          templateColumns={'repeat(auto-fill, minmax(13.5rem, 1fr))'}
          gap={'clamp(1rem, 2vw, 3.25rem)'}
        >
          {map(({ title, attr }) => (
            <>
              {!!attr && (
                <VStack
                  key={title}
                  onClick={() => onClick(attr)}
                  role="group"
                  padding={'1.25rem 1.75rem'}
                  borderRadius={20}
                  bg={fieldHoverBackgroundColor}
                  alignItems={'flex-start'}
                  color={'product.secondary'}
                  cursor={'pointer'}
                  transition="all 0.25s ease"
                  _hover={{
                    bg: 'product.secondary',
                  }}
                >
                  <Box color={'product.secondary'} _groupHover={{ color: theme.colors.text.dark }}>
                    <FontAwesomeIcon
                      icon={faCloudDownloadAlt}
                      color={'inherit'}
                      style={{ width: '76px', height: 'auto' }}
                    />
                  </Box>

                  <Text
                    color={'#4d4d4d'}
                    fontWeight="400"
                    _groupHover={{ color: theme.colors.text.dark }}
                  >
                    {title}
                  </Text>
                  <Text
                    color={'#8a8a8a'}
                    fontWeight="400"
                    marginBlockStart={'3px !important'}
                    display={'none'}
                    _groupHover={{ color: theme.colors.text.dark }}
                  >
                    {'size-type'}
                  </Text>
                </VStack>
              )}
            </>
          ))(documents)}
        </Grid>
      </Box>
    </>
  )
}

export default UploadedDocuments
