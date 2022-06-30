import { Button } from '@chakra-ui/button'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import getPaginationActions from '../utils/get-pagination-actions'

const Footer = ({ rows, sbeCode }) => {
  const totalResults = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))?.value
  const paginationActions = getPaginationActions(sbeCode)

  if (!totalResults) return null

  return (
    rows.length < totalResults.value && (
      <Button
        test-id={`Process-Footer-${title}`}
        variant="ghost"
        colorScheme="secondary"
        onClick={paginationActions.lazy}
      >{`See ${totalResults.value - rows.length} more`}</Button>
    )
  )
}

export default Footer
