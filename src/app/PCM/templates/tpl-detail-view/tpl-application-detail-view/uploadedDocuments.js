import { Box, Grid, Text, VStack, useTheme } from '@chakra-ui/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'
import { map } from 'ramda'
import useProductColors from 'utils/productColors'

const uploadedDocuments = [
  {
    title: 'Employment Contract',
    size: '235 MB',
    fileType: 'pdf',
  },
  {
    title: 'ID Document',
    size: '235 MB',
    fileType: 'pdf',
  },
  {
    title: 'VISA Status',
    size: '235 MB',
    fileType: 'pdf',
  },
  {
    title: 'Bank Statement',
    size: '235 MB',
    fileType: 'pdf',
  },
]

const UploadedDocuments = () => {
  const theme = useTheme()
  const { fieldHoverBackgroundColor } = useProductColors()

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
          {map(({ title, size, fileType }) => (
            <VStack
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
                _groupHover={{ color: theme.colors.text.dark }}
              >
                {size} - {fileType}
              </Text>
            </VStack>
          ))(uploadedDocuments)}
        </Grid>
      </Box>
    </>
  )
}

export default UploadedDocuments
