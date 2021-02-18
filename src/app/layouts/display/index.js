import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'
import { Box } from '@chakra-ui/react'
import Table from 'app/layouts/table'
import Process from 'app/layouts/process'
import Form from 'app/layouts/form'
import Dashboard from 'app/layouts/dashboard'
import DisplayDrawer from './drawer'
import Dialog from 'app/layouts/dialog'
import Toast from './toast'
import Detail from 'app/SBE/detail'

const Display = ({ isPublic }) => {
  const display = useSelector(selectDisplay)

  return isPublic ? (
    <Table mapSearch />
  ) : (
    <Box paddingTop="6rem" id="main-display">
      {display === 'DASHBOARD' && <Dashboard />}
      {display === 'TABLE' && <Table />}
      {display === 'PROCESS' && <Process />}
      {includes('FORM', display || '') && <Form />}
      {display === 'DETAIL' && <Detail />}
      <DisplayDrawer />
      <Dialog />
      <Toast />
    </Box>
  )
}

export default Display
