import { lazy, Suspense } from 'react'

const Card = lazy(() => import('./templates/Card'))

const BECard = ({ parentCode, code, columns, actions }) => {
  return (
    <Suspense fallback={<div />}>
      <Card actions={actions} parentCode={parentCode} code={code} columns={columns} />
    </Suspense>
  )
}

export default BECard
