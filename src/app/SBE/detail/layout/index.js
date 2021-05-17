import { Box, Wrap, WrapItem } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import DetailActions from './Actions'
import DetailHeader from './Header'
import Tile from './Tile'

const DetailLayout = ({ sbeCode, targetCode }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  return (
    <Box>
      <DetailHeader beCode={beCode} />
      <DetailActions />
      <Wrap>
        <WrapItem>
          <Tile />
        </WrapItem>
        <WrapItem>
          <Tile />
        </WrapItem>
        <WrapItem>
          <Tile />
        </WrapItem>
        <WrapItem>
          <Tile />
        </WrapItem>
      </Wrap>
    </Box>
  )
}

export default DetailLayout
