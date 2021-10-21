import { __, compose, last, slice, split } from 'ramda'

import PickedAttribute from 'app/SBE/lane/PickedAttribute'
import { VStack } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'

const MainDetails = ({ columns, parentCode, code }) => {
  const displayMode = useSelector(selectCode(parentCode, 'SCH_DISPLAY_MODE'))

  const details = compose(
    slice(2, __, columns),
    last,
    split('_'),
    last,
    split(':'),
  )(displayMode?.value || 'MAIN_2')

  if (!details?.length) return null

  return (
    <VStack align="start" spacing={1}>
      {details.map((col, index) => (
        <PickedAttribute key={`${col}-${index}`} col={col} code={code} parentCode={parentCode} />
      ))}
    </VStack>
  )
}

export default MainDetails
