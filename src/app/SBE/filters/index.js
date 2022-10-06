import { Stack } from '@chakra-ui/react'

import ExistingFilters from './existing_filters'
import { selectAttributes } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import { useSelector } from 'react-redux'
import SavedSearches from './saved-searches'

const Filters = ({ sbeCode }) => {
  const filterGrp = `QUE_FILTER_GRP_${sbeCode}`
  const [addFilters, existingFilters] = useSelector(
    selectAttributes(filterGrp, ['QUE_ADD_FILTER_GRP', 'QUE_EXISTING_FILTERS_GRP']),
  )

  const isMobile = useIsMobile()

  if (!addFilters) return null

  return (
    <Stack direction={isMobile ? 'column' : 'row'}>
      <SavedSearches sbeCode={sbeCode} />
      <ExistingFilters existingFilters={existingFilters} />
    </Stack>
  )
}

export default Filters
