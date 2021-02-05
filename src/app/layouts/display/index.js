import { includes } from 'ramda'
import { useSelector } from 'react-redux'
import { selectDisplay } from 'redux/app/selectors'
import { Box } from '@chakra-ui/react'
import Table from 'app/layouts/table'
import Process from 'app/layouts/process'
import Form from 'app/layouts/form'

const Display = () => {
  const display = useSelector(selectDisplay)

  return (
    <Box marginTop="1rem">
      {includes('FORM', display || '') ? (
        <Form />
      ) : display === 'TABLE' ? (
        <Table />
      ) : display === 'PROCESS' ? (
        <Process />
      ) : (
        <div>{display}</div>
      )}
    </Box>
  )
}

export default Display
