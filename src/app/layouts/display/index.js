import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'

import Table from 'app/layouts/table'
import Process from 'app/layouts/process'
import Form from 'app/layouts/form'

const Display = () => {
  const display = useSelector(selectDisplay)

  return includes('FORM', display || '') ? (
    <Form />
  ) : display === 'TABLE' ? (
    <Table />
  ) : display === 'PROCESS' ? (
    <Process />
  ) : (
    <div>{display}</div>
  )
}

export default Display
