import { useSelector } from 'react-redux'
import { Flex, Box } from '@chakra-ui/react'

import Form from 'app/layouts/form'
import DetailView from 'app/layouts/detail-and-form/detail-view'
import { selectMentee } from 'redux/db/selectors'

const DetailForm = () => {
  const menteeCodes = useSelector(selectMentee)
  const mentee = menteeCodes?.[0]

  return (
    <Flex mb={5} px={10} alignItems="flex-start">
      <Box maxW="50vw">
        <Form adjacent />
      </Box>
      <DetailView beCode={mentee} />
    </Flex>
  )
}

export default DetailForm
