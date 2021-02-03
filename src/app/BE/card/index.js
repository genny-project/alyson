import { lazy } from 'react'

import { Suspense } from 'react'

const Person = lazy(() => import('./templates/person'))

const BECard = ({ parentCode, code, columns }) => {
  return (
    <Suspense fallback={<div />}>
      <Person parentCode={parentCode} code={code} columns={columns} />
    </Suspense>
  )
}

export default BECard
