import { HStack } from '@chakra-ui/react'
import Form from 'app/layouts/form'
import DetailView from 'app/layouts/detail-and-form/detail-view'

const DetailForm = () => {
  return (
    <HStack spacing={10} mb={5} px={10} alignItems="flex-start">
      <Form adjacent />
      <DetailView />
    </HStack>
  )
}

export default DetailForm
