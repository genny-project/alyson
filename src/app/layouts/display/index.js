import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'

import Table from 'app/layouts/table'
import Process from 'app/layouts/process'

const Display = () => {
  const display = useSelector(selectDisplay)

  return display === 'TABLE' ? (
    <Table />
  ) : display === 'PROCESS' ? (
    <Process />
  ) : (
    <div>{display}</div>
  )
}

export default Display
