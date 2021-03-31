import { useSelector } from 'react-redux'
import { selectForm } from 'redux/app/selectors'
import AsksForm from 'app/ASKS/form'
import { CircularProgress, Center } from '@chakra-ui/react'

import { selectCode } from 'redux/db/selectors'

const Form = ({ onFinish }) => {
  const data = useSelector(selectForm)
  const submit = useSelector(selectCode(data, 'QUE_SUBMIT'))

  if (!submit) return null

  return data ? (
    <AsksForm onFinish={onFinish} questionCode={data} />
  ) : (
    <Center>
      <CircularProgress isIndeterminate />
    </Center>
  )
}

export default Form
