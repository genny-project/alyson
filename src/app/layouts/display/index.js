import { Box, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react'
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
import Table from 'app/layouts/table'
import Toast from './toast'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { includes } from 'ramda'
import { onSendMessage } from 'vertx'
import { selectCode } from 'redux/db/selectors'
import { selectDisplay } from 'redux/app/selectors'
import { useSelector } from 'react-redux'

const Display = ({ title }) => {
  const display = useSelector(selectDisplay)

  const backgroundColor = useColorModeValue('gray.50', '')
  window.onpopstate = event => {
    try {
      onSendMessage(event.state.state.data)
    } catch (err) {
      console.error(err)
    }
  }

  const appName = convertToUppercase(title)

  const projectTitle = useSelector(selectCode('PRJ_' + appName, 'PRI_NAME'))?.valueString
  const projectIcon = useSelector(selectCode('PRJ_' + appName, 'PRI_FAVICON'))?.valueString

  const sideBarWidth = '102px'

  return (
    <ErrorBoundary>
      <MetaTags>
        <title>{projectTitle}</title>
        <link rel="icon" href={projectIcon} type="image/x-icon"></link>
      </MetaTags>
      <HStack>
        <VStack w={sideBarWidth} bg="blue" h="100vh">
          <Text>{`one`}</Text>
          <Text>{`one`}</Text>
          <Text>{`one`}</Text>
          <Text>{`one`}</Text>
          <Text>{`one`}</Text>
          <Text>{`one`}</Text>
          <Text>{`one`}</Text>
        </VStack>
        <Box
          backgroundColor={backgroundColor}
          id="main-display"
          position="fixed"
          left={sideBarWidth}
          right="0"
          top="0"
          bottom="0"
          overflow="scroll"
        >
          <Navigation />
          <Box paddingTop="5.5rem">
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
      </HStack>
    </ErrorBoundary>
  )
}

export default Display
