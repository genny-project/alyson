import { lazy, Suspense } from 'react'

const Person = lazy(() => import('./templates/person'))

const BECard = ({ parentCode, code, columns, actions }) => {
  return (
    <Suspense fallback={<div />}>
      <Person actions={actions} parentCode={parentCode} code={code} columns={columns} />
    </Suspense>
  )
}

export default BECard
