import { useBoolean } from '@chakra-ui/hooks'
import { Box, Center, Wrap, WrapItem } from '@chakra-ui/layout'
import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import DetailActions from './Actions'
import DetailHeader from './Header'
import Tile from './Tile'

const mt = { true: '10rem', false: '25rem' }

const DetailLayout = ({ sbeCode, targetCode }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const [mini, setMini] = useBoolean()

  const onScroll = e => {
    console.log(e)
    setMini.on()
  }

  const onWheel = e => {
    console.log('wheel', e)
    if (e.deltaY < 0 && e.movementY === 0) {
      setMini.off()
    }
  }

  return (
    <Box h="100vh" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <DetailHeader beCode={beCode} mini={mini} />
      <DetailActions />
      <Center w="full" mt={mt[mini]}>
        <Wrap align="center" justify="center">
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
      </Center>
    </Box>
  )
}

export default DetailLayout
