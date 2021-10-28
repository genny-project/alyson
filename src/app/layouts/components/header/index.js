import { Box, Flex, IconButton, Spacer } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { closeDrawer } from 'redux/app'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'

const topHeight = '40vh'

let map = {}
let pano = {}
let geocoder = {}

const DetailHeader = ({ address, videoData, beCode }) => {
  geocoder = new window.google.maps.Geocoder()

  const [geo, setGeo] = useState(null)

  const panoRef = useRef(null)
  const mapRef = useRef(null)

  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())

  useEffect(() => {
    geocoder.geocode({ address }, res => {
      setGeo(res[0]?.geometry.location)
    })
  }, [address])

  useEffect(() => {
    if (geo) {
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

  return (
    <Box bg="gradient.500">
      <Flex h={topHeight}>
        {videoData ? (
          <Attribute
            code={beCode}
            attribute={'PRI_VIDEO_URL'}
            config={{ inline: true }}
            styles={{ width: '100%' }}
          />
        ) : (
          <div
            ref={panoRef}
            style={{
              width: '100%',
              borderTopLeftRadius: '0.5rem',
              height: topHeight,
              marginRight: '2px',
            }}
          />
        )}

        <Spacer />
        <div
          ref={mapRef}
          style={{
            borderTopRightRadius: '0.5rem',
            width: '100%',
            height: topHeight,
            marginLeft: '2px',
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
    </Box>
  )
}

export default DetailHeader
