import Card from './templates/Card'

const BECard = ({ parentCode, code, columns, actions, noExpansion }) => {
  return (
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
