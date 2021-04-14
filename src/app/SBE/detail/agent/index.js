import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Avatar, Box, Flex, HStack, IconButton, Spacer, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'

import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import Action from 'app/BE/action'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faUser } from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import { useIsMobile } from 'utils/hooks'
import AgentMobile from './mobile_view'

let map = {}
let pano = {}
let geocoder = {}

const topHeight = '40vh'

const Agent = ({ sbeCode, targetCode }) => {
  geocoder = new window.google.maps.Geocoder()

  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))

  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const addressData = useSelector(selectCode(beCode, 'PRI_ADDRESS_FULL'))
  const address = addressData?.value
  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const { getImageSrc } = useApi()
  const src = getImageSrc(image?.value)
  const name = useSelector(selectCode(beCode, 'PRI_NAME'))
  const actions = getActions(sbe)

  const [geo, setGeo] = useState(null)
  const isMobile = useIsMobile()

  const panoRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    geocoder.geocode({ address }, res => {
      setGeo(res[0]?.geometry.location)
    })
  }, [address])

  useEffect(() => {
    if (geo && panoRef?.current && mapRef?.current) {
      map = new window.google.maps.Map(mapRef.current, {
        center: geo,
        zoom: 12,
        disableDefaultUI: true,
      })

      pano = new window.google.maps.StreetViewPanorama(panoRef.current, {
        position: geo,
        pov: {
          heading: 34,
          pitch: 10,
        },
        linksControl: false,
        panControl: false,
        enableCloseButton: false,
        zoomControl: false,
        fullscreenControl: false,
      })

      new window.google.maps.Marker({
        position: geo,
        map,
      })

      map.setStreetView(pano)
    }
  }, [geo])

  if (!beCode) return null
  if (isMobile)
    return (
      <AgentMobile
        onClose={onClose}
        actions={actions}
        sbeCode={sbeCode}
        beCode={beCode}
        src={src}
        name={name}
      />
    )

  return (
    <Box
      w="70vw"
      h="100vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
    >
      <Flex>
        <div
          ref={panoRef}
          style={{
            width: '100%',
            borderTopLeftRadius: '0.5rem',
            height: topHeight,
            marginRight: '2px',
            transition: 'height 1s',
          }}
        />
        <Spacer />
        <div
          ref={mapRef}
          style={{
            borderTopRightRadius: '0.5rem',
            width: '100%',
            height: topHeight,
            marginLeft: '2px',
            transition: 'height 1s',
          }}
        />
      </Flex>
      <Box position="absolute" right="2" top="2">
        <IconButton
          onClick={onClose}
          color="white"
          variant="unstyled"
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
        />
      </Box>
      <Box
        position="absolute"
        right="5"
        zIndex="modal"
        height={topHeight}
        overflow="hidden"
        transition="height 1s"
      >
        <VStack align="flex-end" mt="5">
          {actions && (
            <HStack>
              {actions.map(action => (
                <Action
                  parentCode={sbeCode}
                  code={action}
                  targetCode={beCode}
                  key={action}
                  size="md"
                  colorScheme="blue"
                />
              ))}
            </HStack>
          )}
          <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
        </VStack>
      </Box>
      <Avatar
        mt="-4.75rem"
        left="calc(35vw - 4.75rem)"
        bg="white"
        p="4px"
        src={src}
        w="9.5rem"
        h="9.5rem"
        zIndex="modal"
        position="absolute"
      />
      <VStack pt="5rem" overflow="scroll" h={`calc(100vh - ${topHeight})`}>
        <Text fontSize="3xl" fontWeight="semibold" flexWrap="nowrap">
          {name?.value}
        </Text>
        <Attribute code={beCode} attribute={'PRI_STATUS'} />
        <HStack w="65vw" align="start" pt="5" spacing="5">
          <VStack align="start" w="50%">
            <HStack spacing="10" align="start">
              <FontAwesomeIcon icon={faUser} />
              <VStack align="start">
                <Text fontWeight="semibold">Contact details</Text>
                <Attribute code={beCode} attribute={'PRI_MOBILE'} />
                <Attribute code={beCode} attribute={'PRI_ADDRESS_FULL'} />
                <Attribute code={beCode} attribute={'PRI_EMAIL'} />
              </VStack>
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Agent
