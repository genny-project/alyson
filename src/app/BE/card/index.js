import DefaultCard from './templates/Card'
import InternshipCard from './templates/internship'
import getActions from 'app/SBE/utils/get-actions'
import getColumns from 'app/SBE/utils/get-columns'
import { includes } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const BECard = ({ parentCode, code, noExpansion }) => {
  const table = useSelector(selectCode(parentCode), (prev, next) => prev.length === next.length)

  if (!table) return null

  const columns = getColumns(table)
  const actions = getActions(table)

  return includes('BEG_', code || '') ? (
    <InternshipCard actions={actions} parentCode={parentCode} code={code} columns={columns} />
  ) : (
    <DefaultCard
      actions={actions}
      parentCode={parentCode}
      code={code}
      columns={columns}
      noExpansion={noExpansion}
    />
  )
}

export default BECard
