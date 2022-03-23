import { Box, Flex } from '@chakra-ui/react'

import DetailView from 'app/layouts/detail-and-form/detail-view'
import Form from 'app/layouts/form'
import { selectCode } from '../../../redux/db/selectors'
import { selectMentee } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const DetailForm = () => {
  const menteeCodes = useSelector(selectMentee)
  const mentee = menteeCodes?.[0]
  const menteeCode = useSelector(selectCode(mentee, 'PRI_CODE'))?.value

  return (
    <Flex mb={5} px={10} alignItems="flex-start">
      <Box maxW="50vw">
        <Form adjacent />
      </Box>
      <DetailView beCode={menteeCode} />
    </Flex>
  )
}

export default DetailForm
