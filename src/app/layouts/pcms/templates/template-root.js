import { Box, useColorModeValue, Center } from '@chakra-ui/react'
import DeveloperConsole, { isDev } from 'utils/developer'
import { useSelector } from 'react-redux'
import Dashboard from 'app/layouts/dashboard'
import Detail from 'app/SBE/detail'
import Dialog from 'app/layouts/display/dialog'
import DisplayDrawer from 'app/layouts/display/drawer'
import DisplayForm from 'app/layouts/detail-and-form'
import Form from 'app/layouts/form'
import LogrocketIdentifier from '../../components/logrocket_identifier'
import Navigation from '../../navigation'
import Notes from 'app/NOTE'
import Process from 'app/layouts/process'
import { SIDEBAR_WIDTH } from 'utils/constants'
import Table from 'app/layouts/table'
import Toast from 'app/layouts/display/toast'
import { includes } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { selectDisplay } from 'redux/app/selectors'
import PcmField from './pcm-field'
import convertToUppercase from 'utils/formatters/uppercase-convert'
import { apiConfig } from 'config/get-api-config'

const TemplateRoot = ({ mappedPcm }) => {
  const display = useSelector(selectDisplay)

  // HEADER, SIDEBAR
  const { PRI_LOC1, PRI_LOC2 } = mappedPcm
  const backgroundColor = useColorModeValue('gray.50', '')

  const { realm } = apiConfig
  const appName = convertToUppercase(realm)

  var primaryColour = useSelector(selectCode('PRJ_' + appName, 'PRI_COLOR'))?.valueString
  if (primaryColour === undefined) {
    primaryColour = '#224371'
  }

  return (
    <Box position={'relative'} h={'100%'}>
      <Center w={SIDEBAR_WIDTH} bg={primaryColour} h="100vh" paddingInline={'3'}>
        <PcmField code={PRI_LOC2} />
      </Center>
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
        <PcmField code={PRI_LOC1} />
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
  )
}

export default TemplateRoot
