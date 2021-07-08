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
import { onSendMessage } from 'vertx'
import DisplayHandler from './DisplayHandler'

const Display = () => {
  const backgroundColor = useColorModeValue('gray.50', '')
  window.onpopstate = event => {
    try {
      onSendMessage(event.state.state.data)
    } catch (err) {
      console.error(err)
    }
  }

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
          <DisplayHandler displayCode="DASHBOARD">
            <Dashboard />
          </DisplayHandler>

          <DisplayHandler displayCode="PROCESS">
            <Process />
          </DisplayHandler>

          <DisplayHandler displayCode="TABLE">
            <Table />
          </DisplayHandler>

          <DisplayHandler displayCode="DETAIL">
            <Detail />
          </DisplayHandler>

          <DisplayHandler displayCode="FORM">
            <Form />
          </DisplayHandler>

          <DisplayHandler displayCode="MAP">
            <Table mapSearch />
          </DisplayHandler>

          <DisplayHandler displayCode="NOTES">
            <Notes />
          </DisplayHandler>

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
