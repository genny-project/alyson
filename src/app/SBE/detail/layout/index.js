import { useBoolean } from '@chakra-ui/hooks'
import { Box, Center, Stack, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Card from 'app/layouts/components/card'
import { add } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import DetailActions from './Actions'
import DetailHeader from './Header'
import Tile from './Tile'
import 'app/layouts/components/css/hide-scroll.css'

const pt = { true: '8rem', false: '28rem' }

const DetailLayout = ({ sbeCode, targetCode, details = [[], []] }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

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

  return (
    <Box className="nobar" h="100vh" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <DetailHeader sbeCode={sbeCode} beCode={beCode} mini={mini} />
      <DetailActions />
      <Center w="full" pt={pt[mini || isMobile]} pb="3rem">
        <Stack direction={isMobile ? 'column' : 'row'}>
          {isMobile && (
            <Center w="full">
              <Card maxW="30rem" variant="card3" p={0} w={tileWidth} overflow="hidden">
                <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
              </Card>
            </Center>
          )}
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
