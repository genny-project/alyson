import { VStack } from '@chakra-ui/react'
import Form from 'app/layouts/form'
import DetailView from 'app/layouts/detail-and-form/detail-view'

const DetailForm = () => {
  return (
    <VStack spacing={10}>
      <DetailView />
      <Form />
    </VStack>
  )
}

export default DetailForm
