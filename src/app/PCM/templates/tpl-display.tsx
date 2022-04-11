import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'
import Dashboard from 'app/layouts/dashboard'
import Detail from 'app/SBE/detail'
import DisplayForm from 'app/layouts/detail-and-form'
import Form from 'app/layouts/form'
import Notes from 'app/NOTE'
import Process from 'app/layouts/process'
import Table from 'app/layouts/table'
import { includes } from 'ramda'

/**
 * This is a backwards compatibility pcm.
 * It preforms the task that the old display.js use to do
 */
const TemplateDisplay = ({ ...props }) => {
  const display = useSelector(selectDisplay)

  return (
    <>
      {/* <Timeout /> */}
      {display === 'DASHBOARD' && <Dashboard />}
      {display === 'TABLE' && <Table mapSearch={undefined} />}
      {display === 'PROCESS' && <Process dashboard={undefined} />}
      {display === 'VIEW:ASK' && <DisplayForm />}
      {includes('FORM', (display as string) || '') && (
        <Form onFinish={undefined} dialog={undefined} layout={undefined} />
      )}
      {display === 'DETAIL' && <Detail targetCode={undefined} defaultView={undefined} />}
      {display === 'MAP' && <Table mapSearch />}
      {display === 'NOTES' && <Notes />}
    </>
  )
}

export default TemplateDisplay
