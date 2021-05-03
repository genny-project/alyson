import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'
import { Box, useColorModeValue } from '@chakra-ui/react'
import Table from 'app/layouts/table'
import Process from 'app/layouts/process'
import Form from 'app/layouts/form'
import Dashboard from 'app/layouts/dashboard'
import DisplayDrawer from './drawer'
import Dialog from 'app/layouts/display/dialog'
import Toast from './toast'
import Detail from 'app/SBE/detail'
import Navigation from '../navigation'
import DeveloperConsole, { isDev } from 'utils/developer'
import LogrocketIdentifier from '../components/logrocket_identifier'
import ErrorBoundary from 'utils/developer/ErrorBoundary'
import Notes from 'app/NOTE'

const Display = () => {
  const display = useSelector(selectDisplay)
  const backgroundColor = useColorModeValue('gray.50', '')

  return (
    <ErrorBoundary>
      <Box
        backgroundColor={backgroundColor}
        id="main-display"
        position="fixed"
        left="0"
        right="0"
        top="0"
        bottom="0"
        overflow="scroll"
      >
        <Navigation />
        <Box paddingTop="6rem">
          {display === 'DASHBOARD' && <Dashboard />}
          {display === 'TABLE' && <Table />}
          {display === 'PROCESS' && <Process />}
          {includes('FORM', display || '') && <Form />}
          {display === 'DETAIL' && <Detail />}
          {display === 'MAP' && <Table mapSearch />}
          {display === 'NOTES' && <Notes />}
          <DisplayDrawer />
          <Dialog />
          <Toast />
        </Box>
        {isDev ? <DeveloperConsole /> : null}
        <LogrocketIdentifier />
      </Box>
    </ErrorBoundary>
  )
}

export default Display
