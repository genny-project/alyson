import { useCallback } from 'react'
import { Tfoot, Tr, Th, Text, IconButton, Kbd, VStack, Center } from '@chakra-ui/react'
import getPaginationActions from 'app/SBE/utils/get-pagination-actions'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'

const TableFooter = ({ sbeCode }) => {
  const paginationActions = useCallback(() => getPaginationActions(sbeCode), [sbeCode])
  const pageSize = useSelector(selectCode(sbeCode, 'SCH_PAGE_SIZE'))
  const pageStart = useSelector(selectCode(sbeCode, 'SCH_PAGE_START'))
  const totalResults = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const pageNumber = useSelector(selectCode(sbeCode, 'PRI_INDEX'))

  useHotkeys('shift+left', paginationActions().previous)
  useHotkeys('shift+right', paginationActions().next)

  if (!(pageSize && totalResults && pageStart && pageNumber)) return null

  const hasNextPage = pageSize.value + pageStart.value < totalResults.value
  const hasPrevPage = pageNumber.value > 1
  const totalPages = Math.ceil(totalResults.value / pageSize.value)

  return (
    <Tfoot>
      <Tr>
        <Th />
        <Th>
          <VStack>
            <IconButton
              onClick={paginationActions().previous}
              isDisabled={!hasPrevPage}
              icon={<FontAwesomeIcon icon={faArrowLeft} />}
            />
            <Kbd>shift</Kbd>
          </VStack>
        </Th>
        <Th>
          <Text>{`page ${pageNumber.value}`}</Text>
          <Text>{`of ${totalPages}`}</Text>
        </Th>
        <Th>
          <VStack>
            <IconButton
              onClick={paginationActions().next}
              isDisabled={!hasNextPage}
              icon={<FontAwesomeIcon icon={faArrowRight} />}
            />
            <Kbd>shift</Kbd>
          </VStack>
        </Th>
      </Tr>
    </Tfoot>
  )
}

export default TableFooter
