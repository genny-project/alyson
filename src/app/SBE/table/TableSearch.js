import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { compose } from 'ramda'

import Ask from 'app/ASKS/ask'

const TableSearch = ({ searchCode }) => {
  const tableSearch = compose(useSelector, selectCode)(searchCode)

  return (
    <Box>
      {tableSearch &&
        tableSearch.map((childAsk, index) => (
          <Box key={`${index}-${childAsk}`} width={'20rem'}>
            <Ask
              noLabel
              questionCode={childAsk}
              parentCode={'QUE_TABLE_FILTER_GRP'}
              forcedComponent="dropdown"
            />
          </Box>
        ))}
    </Box>
  )
}

export default TableSearch
