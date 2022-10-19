import TableWrapper from 'app/layouts/table'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { tableSbeLocation } from 'utils/constants'

const TemplateTable = ({ parentCode }) => {
  const tableObject = useSelector(selectCode(parentCode, tableSbeLocation))
  const tableCode = tableObject?.value || ''

  return <TableWrapper tableCode={tableCode} />
}

export default TemplateTable
