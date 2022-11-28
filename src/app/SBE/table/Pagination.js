import { useCallback } from 'react'
import { Text, IconButton, HStack } from '@chakra-ui/react'
import getPaginationActions from 'app/SBE/utils/get-pagination-actions'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'

const Pagination = ({ sbeCode }) => {
  const paginationActions = useCallback(() => getPaginationActions(sbeCode), [sbeCode])
  const pageSize = useSelector(selectCode(sbeCode, 'SCH_PAGE_SIZE'))
  const pageStart = useSelector(selectCode(sbeCode, 'SCH_PAGE_START'))
  const totalResults = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const pageIndex = useSelector(selectCode(sbeCode, 'PRI_INDEX'))

  let allItemsInTable = useSelector(selectRows(sbeCode))
  let allItemsInTableLength = allItemsInTable.length

  useHotkeys('shift+left', paginationActions().previous)
  useHotkeys('shift+right', paginationActions().next)

  if (!(pageSize && totalResults && pageStart && pageIndex)) return null

  const hasNextPage = pageSize.value + pageStart.value < totalResults.value
  const hasPrevPage = pageIndex.value > 0

  return (
    <HStack justify="flex-end" align="flex-end">
      <Text textStyle="body.2" w="max-content">{`${pageStart.value + 1} - ${
        pageStart.value + allItemsInTableLength
      } of ${totalResults.value}`}</Text>
      <IconButton
        onClick={paginationActions().previous}
        isDisabled={!hasPrevPage}
        icon={<FontAwesomeIcon icon={faChevronLeft} />}
        size="sm"
        variant="ghost"
      />
      <IconButton
        onClick={paginationActions().next}
        isDisabled={!hasNextPage}
        icon={<FontAwesomeIcon icon={faChevronRight} />}
        size="sm"
        variant="ghost"
      />
    </HStack>
  )
}

export default Pagination
