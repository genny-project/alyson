import { Center, CircularProgress } from '@chakra-ui/react'

import AsksForm from 'app/ASKS/form'
import { selectForm } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const Form = ({ onFinish, dialog, layout }) => {
  const data = useSelector(selectForm)

  return data ? (
    <AsksForm dialog={dialog} onFinish={onFinish} questionCode={data} layout={layout} />
  ) : (
    <Center>
      <CircularProgress isIndeterminate />
    </Center>
  )
}

export default Form
