import { useBoolean } from '@chakra-ui/hooks'
import { Box, Center, Stack, VStack, Flex, HStack, Text } from '@chakra-ui/layout'
import { add } from 'ramda'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import DetailActions from './Actions'
import DetailHeader from './Header'
import Tile from './Tile'
import 'app/layouts/components/css/hide-scroll.css'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faUser,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
  faGraduationCap,
  faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '@chakra-ui/react'
import LeftDetail from 'app/SBE/details/template/LeftDetail.js'
import Card from 'app/layouts/components/card'
import { closeDrawer } from 'redux/app'

const DetailLayout = ({ sbeCode, targetCode, details = [[], []] }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const videoData = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))
  const isMobile = useIsMobile()
  const [mini, setMini] = useBoolean(isMobile)
  const [delta, setDelta] = useState(0)

  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

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
      <Box w="100%" alignItems="start" display="flex">
        <LeftDetail beCode={beCode} sbeCode={sbeCode} />
        <VStack bg="yellow" flex="1" m={3}>
          <Center w="full">
            <Card minH="10rem" p={0} w="full" bg="#1A365D" overflow="hidden" borderRadius="2rem">
              <Center w="full">
                <Box maxW="30vw">
                  <Attribute code={beCode} attribute="PRI_VIDEO_URL" />
                </Box>
              </Center>
            </Card>
          </Center>
          <Box
            overflow="hidden"
            borderRadius="50%"
            position="absolute"
            zIndex="modal"
            right="12"
            top="10"
          >
            <IconButton
              onClick={onClose}
              size="sm"
              color="#1A365D"
              bg="white"
              icon={<FontAwesomeIcon opacity={50} icon={faTimes} />}
            />
          </Box>

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
      </Box>
    </Box>
  )
}

export default DetailLayout
