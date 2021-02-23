import { compose, split, last, __, slice } from 'ramda'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { VStack } from '@chakra-ui/react'
import PickedAttribute from 'app/SBE/lane/PickedAttribute'

const RestDetails = ({ columns, parentCode, code }) => {
  const displayMode = useSelector(selectCode(parentCode, 'SCH_DISPLAY_MODE'))

  const details = compose(
    slice(__, Infinity, columns),
    last,
    split('_'),
    last,
    split(':'),
  )(displayMode?.value || 'MAIN_2')

  if (!details?.length) return null

  return (
    <VStack align="left" p="3">
      {details.map(col => (
        <PickedAttribute key={col} col={col} code={code} parentCode={parentCode} />
      ))}
    </VStack>
  )
}

export default RestDetails
