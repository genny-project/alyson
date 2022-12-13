import { Box, Grid, Text, VStack, useTheme } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
import { compose, map } from 'ramda'
import { selectCodeUnary } from 'redux/db/selectors'
import useProductColors from 'utils/productColors'
import { useSelector } from 'react-redux'

const UploadedDocuments = ({ code }) => {
  const theme = useTheme()
  const { fieldHoverBackgroundColor } = useProductColors()

  const bankStatement = compose(useSelector, selectCodeUnary(code))('PRI_BANK_STATEMENT')?.value
  const visaStatus = compose(useSelector, selectCodeUnary(code))('PRI_VISA')?.value
  const passport = compose(useSelector, selectCodeUnary(code))('PRI_PASSPORT')?.value

  const documents = [
    { title: 'Bank Statement', attr: bankStatement },
    { title: 'VISA Status', attr: visaStatus },
    { title: 'Passport', attr: passport },
  ]

  const onClick = e => {
    e.preventDefault()
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
            <Box key={title}>
              {!!attr && (
                <VStack
                  key={title}
                  onClick={onClick}
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
            </Box>
          ))(documents)}
        </Grid>
      </Box>
    </>
  )
}

export default UploadedDocuments
