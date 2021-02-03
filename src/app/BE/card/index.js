import { lazy } from 'react'

import { Suspense } from 'react'

const Internmatch = lazy(() => import('./templates/internmatch'))

const BECard = ({ parentCode, code, columns }) => {
  return (
    <Suspense fallback={<div />}>
      <Internmatch parentCode={parentCode} code={code} columns={columns} />
    </Suspense>
  )
}

export default BECard
