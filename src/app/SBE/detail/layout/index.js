import { useBoolean } from '@chakra-ui/hooks'
import { Box, Center, Stack, VStack } from '@chakra-ui/layout'
import { add } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import DetailActions from './Actions'
import DetailHeader from './Header'
import Tile from './Tile'
import 'app/layouts/components/css/hide-scroll.css'

const DetailLayout = ({ sbeCode, targetCode, details = [[], []] }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const videoData = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))
  const isMobile = useIsMobile()
  const [mini, setMini] = useBoolean(isMobile)
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

  const tileWidth = isMobile ? '80vw' : '33vw'

  const pt = isMobile
    ? { true: '12rem', false: '12rem' }
    : videoData?.value
    ? { true: '20rem', false: '30rem' }
    : { true: '16rem', false: '18rem' }

  return (
    <Box className="nobar" h="100vh" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <DetailHeader sbeCode={sbeCode} beCode={beCode} mini={mini || isMobile} />
      <DetailActions />
      <Center w="full" pt={`calc(${pt[mini || isMobile]} + 1vw)`} pb="3rem">
        <Stack direction={isMobile ? 'column' : 'row'}>
          {details.map((col, colIdx) => (
            <VStack key={colIdx}>
              {col.map((item, idx) =>
                React.isValidElement(item) ? (
                  <Box>{item}</Box>
                ) : (
                  <Tile
                    key={`${colIdx} - ${idx}`}
                    beCode={beCode}
                    w={tileWidth}
                    attributes={item.attributes}
                    header={item.header}
                    icon={item.icon}
                  />
                ),
              )}
            </VStack>
          ))}
        </Stack>
      </Center>
    </Box>
  )
}

export default DetailLayout
