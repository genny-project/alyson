import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'
import { Box, useTheme, useColorModeValue } from '@chakra-ui/react'
import Table from 'app/layouts/table'
import Process from 'app/layouts/process'
import Form from 'app/layouts/form'
import Dashboard from 'app/layouts/dashboard'
import DisplayDrawer from './drawer'
import Dialog from 'app/layouts/dialog'
import Toast from './toast'
import Detail from 'app/SBE/detail'
import Public from 'app/layouts/public'
import NotesDrawer from './notes_drawer'

const Display = ({ isPublic }) => {
  const display = useSelector(selectDisplay)
  const theme = useTheme()
  const color = useColorModeValue(theme.colors.text.light, theme.colors.text.dark)

  return isPublic ? (
    <Public />
  ) : (
    <Box paddingTop="6rem" id="main-display" color={color}>
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
  )
}

export default Display
