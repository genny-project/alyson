import { useSelector } from 'react-redux'
import { selectForm } from 'redux/app/selectors'
import AsksForm from 'app/ASKS/form'

const Form = () => {
  const data = useSelector(selectForm)

  if (!data) return null

  return <AsksForm questionCode={data} />
}

export default Form
