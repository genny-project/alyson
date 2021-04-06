import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'
import { Box, useTheme, useColorModeValue } from '@chakra-ui/react'
import Table from 'app/layouts/table'
import Process from 'app/layouts/process'
import Form from 'app/layouts/form'
import Dashboard from 'app/layouts/dashboard'
import DisplayDrawer from './drawer'
import Dialog from 'app/layouts/display/dialog'
import Toast from './toast'
import Detail from 'app/SBE/detail'
import Public from 'app/layouts/public'
import NotesDrawer from './notes_drawer'
import Navigation from '../navigation'
import DeveloperConsole, { isDev } from 'utils/developer'
import { selectAttributes, selectCode } from 'redux/db/selectors'
import { useEffect } from 'react'
import LogRocket from 'logrocket'
import getUserType from 'utils/helpers/get-user-type'

const Display = ({ isPublic }) => {
  const display = useSelector(selectDisplay)
  const theme = useTheme()
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)
  const backgroundColor = useColorModeValue('gray.50', '')
  const code = useSelector(selectCode('USER'))
  const [nameData, emailData] = useSelector(selectAttributes(code, ['PRI_NAME', 'PRI_EMAIL']))
  const type = getUserType(useSelector(selectCode(code)))

  useEffect(() => {
    if (code) {
      const name = nameData?.value
      const email = emailData?.value
      console.log('logrocket identified')
      LogRocket.identify(email, { code, name, email, type, isDev })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  return isPublic ? (
    <Public />
  ) : (
    <Box
      backgroundColor={backgroundColor}
      id="main-display"
      color={color}
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
        <NotesDrawer />
        <DisplayDrawer />
        <Dialog />
        <Toast />
      </Box>
      {isDev ? <DeveloperConsole /> : null}
    </Box>
  )
}

export default Display
