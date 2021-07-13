import { useBoolean } from '@chakra-ui/hooks'
import { Box, Center, Stack, VStack, Flex, HStack, Text } from '@chakra-ui/layout'
import { add } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import DetailActions from './Actions'
import DetailHeader from './Header'
import Tile from './Tile'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'

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

  const tileWidth = isMobile ? '90vw' : '33vw'

  const pt = videoData?.value
    ? { true: '12rem', false: '24rem' }
    : { true: '12rem', false: '18rem' }

  return (
    <Box className="nobar" minH="90vh" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <HStack w="100%" h="100%" bg="blue" alignItems="start">
        <Box bg="red" h="100%">
          <VStack bg="tomato" mx="10" my="8" align="start">
            <Box>
              <Attribute
                code={beCode}
                config={{ h: '15rem', w: '15rem' }}
                attribute="PRI_IMAGE_URL"
              />
            </Box>
            <HStack spacing={5}>
              <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute="PRI_FIRSTNAME" />
              <Attribute config={{ color: '#3182CE' }} code={beCode} attribute="PRI_LINKEDIN_URL" />
            </HStack>
          </VStack>
        </Box>
        <VStack bg="yellow" flex="1">
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>

          <div>{`cyrus`}</div>
          <div>{`shrestha`}</div>
        </VStack>
      </HStack>
    </Box>
  )
}

export default DetailLayout
