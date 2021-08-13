import { useSelector } from 'react-redux'
import { HStack } from '@chakra-ui/react'

import Form from 'app/layouts/form'
import DetailView from 'app/layouts/detail-and-form/detail-view'
import { selectMentee } from 'redux/db/selectors'

const DetailForm = () => {
  const menteeCodes = useSelector(selectMentee)
  const mentee = menteeCodes?.[0]

  return (
    <HStack spacing={10} mb={5} px={10} alignItems="flex-start">
      <Form adjacent />
      <DetailView beCode={mentee} />
    </HStack>
  )
}

export default DetailForm
