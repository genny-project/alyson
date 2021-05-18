import { useBoolean } from '@chakra-ui/hooks'
import { Box, Center, Stack, VStack } from '@chakra-ui/layout'
import { add } from 'ramda'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import DetailActions from './Actions'
import DetailHeader from './Header'
import Tile from './Tile'

const pt = { true: '10rem', false: '25rem' }

const DetailLayout = ({ sbeCode, targetCode, details = [[], []] }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const tileWidth = '32rem'
  const [mini, setMini] = useBoolean()
  const [delta, setDelta] = useState(0)

  const onScroll = e => {
    setMini.on()
    setDelta(0)
  }

  const onWheel = e => setDelta(add(e.deltaY))

  useEffect(() => {
    if (delta < -300) {
      setMini.off()
      setDelta(0)
    }
  }, [delta, setMini])

  return (
    <Box h="100vh" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <DetailHeader beCode={beCode} mini={mini} />
      <DetailActions />
      <Center w="full" pt={pt[mini]} pb="3rem">
        <Stack direction={['column', 'row']}>
          {details.map((col, colIdx) => (
            <VStack key={colIdx}>
              {col.map(({ attributes, header, icon }, idx) => (
                <Tile
                  key={`${colIdx} - ${idx}`}
                  beCode={beCode}
                  w={tileWidth}
                  attributes={attributes}
                  header={header}
                  icon={icon}
                />
              ))}
            </VStack>
          ))}
        </Stack>
      </Center>
    </Box>
  )
}

export default DetailLayout
