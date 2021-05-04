import { useSelector } from 'react-redux'
import { selectForm } from 'redux/app/selectors'
import AsksForm from 'app/ASKS/form'
import { CircularProgress, Center } from '@chakra-ui/react'

const Form = ({ onFinish, dialog }) => {
  const data = useSelector(selectForm)

  return data ? (
    <AsksForm dialog={dialog} onFinish={onFinish} questionCode={data} />
  ) : (
    <Center>
      <CircularProgress isIndeterminate />
    </Center>
  )
}

export default Form
