import { Text, VStack } from '@chakra-ui/react'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { useIsProductInternmatch } from 'utils/helpers/check-product-name'
import useProductColors from 'utils/productColors'
import 'app/SBE/table/table.css'

const TableTitle = ({ sbeCode }) => {
  const title = useSelector(selectCode(sbeCode, 'SCH_TITLE'))
  const description = useSelector(selectCode(sbeCode, 'SCH_DESC'))
  const { tableTitleCSS } = useProductColors()
  const isInternmatch = useIsProductInternmatch()

  return (
    <VStack alignItems={'flex-start'}>
      <Text className={tableTitleCSS}>{title?.value}</Text>
      {isInternmatch && (
        <Text fontSize="1.0rem" fontWeight="400" color="#063231">
          {description?.value}
        </Text>
      )}
    </VStack>
  )
}

export default TableTitle
