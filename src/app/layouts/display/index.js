import { Box, useColorModeValue } from '@chakra-ui/react'
import DeveloperConsole, { isDev } from 'utils/developer'

import Dashboard from 'app/layouts/dashboard'
import Detail from 'app/SBE/detail'
import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from './drawer'
import DisplayForm from 'app/layouts/detail-and-form'
import ErrorBoundary from 'utils/developer/ErrorBoundary'
import Form from 'app/layouts/form'
import LogrocketIdentifier from '../components/logrocket_identifier'
import { MetaTags } from 'react-meta-tags'
import Navigation from '../navigation'
import Notes from 'app/NOTE'
import Process from 'app/layouts/process'
import { SIDEBAR_WIDTH } from 'utils/constants'
import SideBar from 'app/layouts/display/sidebar'
import Table from 'app/layouts/table'
import Toast from './toast'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { includes } from 'ramda'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { selectDisplay } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const Display = () => {
  const display = useSelector(selectDisplay)

  const backgroundColor = useColorModeValue('gray.50', '')
  window.onpopstate = event => {
    try {
      onSendMessage(event.state.state.data)
    } catch (err) {
      console.error(err)
    }
  }

  const appName = useSelector(selectCode('PROJECT'))
  const projectTitle = useSelector(selectCode(appName, 'PRI_NAME'))?.valueString
  const projectIcon = useSelector(selectCode(appName, 'PRI_FAVICON'))?.valueString

  return (
    <ErrorBoundary>
      <MetaTags>
        <title>{projectTitle}</title>
        <link rel="icon" href={projectIcon} type="image/x-icon"></link>
      </MetaTags>
      <Box position={'relative'} h={'100%'}>
        <SideBar />
        <Box
          backgroundColor={backgroundColor}
          id="main-display"
          position="fixed"
          left={SIDEBAR_WIDTH}
          top="74px"
          width={`calc(100% - ${SIDEBAR_WIDTH})`}
          h={'calc(100vh - 74px)'}
          pb={1}
          overflow="scroll"
        >
          <Navigation />
          <Box paddingTop="2.25rem">
            {/* <Timeout /> */}
            {display === 'DASHBOARD' && <Dashboard />}
            {display === 'TABLE' && <Table />}
            {display === 'PROCESS' && <Process />}
            {display === 'VIEW:ASK' && <DisplayForm />}
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
      </Box>
    </ErrorBoundary>
  )
}

export default Display
