import { useSelector } from 'react-redux'
import { selectForm } from 'redux/app/selectors'
import AsksForm from 'app/ASKS/form'
import { CircularProgress, Center } from '@chakra-ui/react'

const Form = ({ onFinish }) => {
  const data = useSelector(selectForm)

  return data ? (
    <AsksForm onFinish={onFinish} questionCode={data} />
  ) : (
    <Center>
      <CircularProgress isIndeterminate />
    </Center>
  )
}

export default Form
