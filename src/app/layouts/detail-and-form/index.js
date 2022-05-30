import { Box, Grid } from '@chakra-ui/react'

import DetailView from 'app/layouts/detail-and-form/detail-view'
import Form from 'app/layouts/form'
import { selectCode } from '../../../redux/db/selectors'
import { selectMentee } from 'redux/db/selectors'
import { useMobileValue } from 'utils/hooks'
import { useSelector } from 'react-redux'

const DetailForm = () => {
  const menteeCodes = useSelector(selectMentee)
  const mentee = menteeCodes?.[0]
  const menteeCode = useSelector(selectCode(mentee, 'PRI_CODE'))?.value
  const templateColumns = useMobileValue(['1fr', '1fr 2fr'])

  return (
    <Grid
      templateColumns={templateColumns}
      alignItems={'start'}
      mb={4}
      px={4}
      gap={'1rem'}
      mx={'auto'}
      maxW={'80rem'}
    >
      <Box>
        <Form adjacent layout={'detailForm'} />
      </Box>
      <DetailView beCode={menteeCode} />
    </Grid>
  )
}

export default DetailForm
