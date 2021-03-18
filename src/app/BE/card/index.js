import { includes } from 'ramda'
import Card from './templates/Card'
import InternshipCard from './templates/internship'

const BECard = ({ parentCode, code, columns, actions, noExpansion }) => {
  return includes('BEG_', code) ? (
    <InternshipCard actions={actions} parentCode={parentCode} code={code} columns={columns} />
  ) : (
    <Card
      actions={actions}
      parentCode={parentCode}
      code={code}
      columns={columns}
      noExpansion={noExpansion}
    />
  )
}

export default BECard
