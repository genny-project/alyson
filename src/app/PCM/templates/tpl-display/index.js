import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'
import Dashboard from 'app/layouts/dashboard'
import DisplayForm from 'app/layouts/detail-and-form'
import Form from 'app/layouts/form'
import Process from 'app/layouts/process'
import Table from 'app/layouts/table'
import { includes } from 'ramda'

/**
 * This is a backwards compatibility pcm.
 * It preforms the task that the old display.js use to do
 */
const TemplateDisplay = ({ depth, ...props }) => {
  const display = useSelector(selectDisplay)

  return (
    <>
      {/* <Timeout /> */}
      {display === 'DASHBOARD' && <Dashboard />}
      {display === 'TABLE' && <Table />}
      {display === 'PROCESS' && <Process />}
      {display === 'VIEW:ASK' && <DisplayForm />}
      {includes('FORM', display || '') && <Form />}
      {display === 'MAP' && <Table />}
    </>
  )
}

export default TemplateDisplay
