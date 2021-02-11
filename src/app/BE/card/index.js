import Card from './templates/Card'

const BECard = ({ parentCode, code, columns, actions }) => {
  return <Card actions={actions} parentCode={parentCode} code={code} columns={columns} />
}

export default BECard
